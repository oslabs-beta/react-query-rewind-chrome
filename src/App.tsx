import './css/styles.css';
import { useState, useEffect } from 'react';
import ParentTab from './containers/ParentTab';
import { QueryEvent, QueryMetrics } from './types';
import MultiSelect from './components/MultiSelect';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import trackMetrics from './functions/trackMetrics';

function App() {
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);
  const [queryEvents, setQueryEvents] = useState<QueryEvent[]>([]);
  const [queryMetrics, setQueryMetrics] = useState<QueryMetrics>({
    successful: [],
    failed: [],
    retries: [],
  });

  // adds event listeners when component mounts
  useEffect(() => {
    // connects to background.js
    let port = chrome.runtime.connect({ name: 'devtools-panel' });

    // listents for messages from npm package
    port.onMessage.addListener(message => {
      // store state of query cache changes
      if (message.type === 'event') {
        setQueryEvents(queryEvents => [...queryEvents, message.event]);
      }

      // store state of query metrics
      if (message.type === 'metric') {
        const metricType = message.metric.type;
        const metric = message.metric.data;
        trackMetrics(metricType, metric, setQueryMetrics);
      }
    });

    // reloads DevTool panel
    // need to define exact function for the listener to be removed in return
    const windowReloaded = () => {
      window.location.reload();
    };

    // event listner triggered when user navigates to new tab / reloads page
    chrome.devtools.network.onNavigated.addListener(windowReloaded);

    // cleanup 2 listeners on component dismount
    return () => {
      port.disconnect();
      chrome.devtools.network.onNavigated.removeListener(windowReloaded);
    };
  }, []);

  // updates state for selected queries
  const handleSelectionChange = (queries: string[]) => {
    setSelectedQueries(queries);

    // *** Persisting Query Selection ***
    // this is complex because we may store queries that are not yet visible in the drop-down

    // *** Refactor notes: handle errors (maybe update to promises)

    // set thisSessionsQueries to the queries array the function takes in because on page load, queries will be an empty array, effectively resetting it. If queries is an empty array, we initialize it here to an empty array. When queries is not empty, we will set it at the end of the function
    if (queries.length === 0) {
      chrome.storage.local.set({ thisSessionsQueries: queries });
    }

    // to allow users to remove queries, we will separately store the data from the session as "thisSessionsQueries" - this will allow us to see when a query has been removed
    const queriesSet = new Set(queries);
    chrome.storage.local.get(['thisSessionsQueries'], result => {
      if (
        result.thisSessionsQueries &&
        Array.isArray(result.thisSessionsQueries)
      ) {
        const queriesRemoved: string[] = [];
        for (const queryKey of result.thisSessionsQueries) {
          if (!queriesSet.has(queryKey)) {
            queriesRemoved.push(queryKey);
          }
        }

        // get the query keys that were stored from previous sessions
        chrome.storage.local.get(['selectedQueries'], result => {
          // get the queries out of local storage and store them as an array
          let existingQueries: string[] = [];
          if (result.selectedQueries && Array.isArray(result.selectedQueries)) {
            existingQueries = result.selectedQueries;
          }

          // combine existing queries with the new ones and handle duplicates
          const combinedQueries = new Set([...existingQueries, ...queries]);
          // remove the queries that users unselected
          const combinedQueriesWithRemovals: string[] = [];
          for (const queryKey of combinedQueries) {
            // if queryKey is not in the removals list, add it to be stored
            if (!queriesRemoved.includes(queryKey)) {
              // store as a set for faster access
              combinedQueriesWithRemovals.push(queryKey);
            }
          }

          // add the combinedQueries into local storage
          chrome.storage.local.set({
            selectedQueries: combinedQueriesWithRemovals,
          });

          // update storage for current session's selections
          chrome.storage.local.set({ thisSessionsQueries: queries });
        });
      }
    });
  };

  return (
    <Container maxWidth={false} style={{ height: '100vh', padding: 0 }}>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          p: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MultiSelect
          onSelectionChange={handleSelectionChange}
          queryEvents={queryEvents}
        />
        <Box sx={{ flexGrow: 1 }}>
          <ParentTab
            queryEvents={queryEvents}
            selectedQueries={selectedQueries}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
