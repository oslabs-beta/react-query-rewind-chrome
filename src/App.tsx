import './css/styles.css';
import { useState, useEffect } from 'react';
import ParentTab from './containers/ParentTab';
import { QueryEvent } from './types';
import MultiSelect from './components/MultiSelect';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function App() {
  // state to store changes to query cache
  const [queryEvents, setQueryEvents] = useState<QueryEvent[]>([]);
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);

  // adds event listeners when component mounts
  useEffect(() => {
    // connects to background.js and listens for messages
    let port = chrome.runtime.connect({ name: 'devtools-panel' });
    port.onMessage.addListener(message => {
      setQueryEvents(queryEvents => [...queryEvents, message.event]);
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
    console.log('handle selection change called');
    // store selected queries in local storage
    // need to first get existing (not sure if this allows you to ever remove?)
    chrome.storage.local.get(['selectedQueries'], (result) => {
      // get the queries out of local storage and store them as an array
      let existingQueries: string[] = [];
      if (result.selectedQueries && Array.isArray(result.selectedQueries)) {
        existingQueries = result.selectedQueries;
      }

      // combine existing queries with the new ones and handle duplicates
      const combinedQueries = Array.from( new Set([...existingQueries, ...queries]))

      // add the combinedQueries into local storage
      chrome.storage.local.set({selectedQueries: combinedQueries}, () => {
        console.log('Stored selected queries: ', combinedQueries);
      })
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
