import './css/styles.css';
import React, { useState, useEffect } from 'react';
import ParentTab from './containers/ParentTab';
import { QueryEvent } from './types';
import MultiSelect from './components/MultiSelect';
import saveSelectedQueryKeys from './functions/saveSelectedQueryKeys'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type QueryMetrics = {
  // [queryKey: ]
};

function App() {
  // state to store changes to query cache
  const [queryEvents, setQueryEvents] = useState<QueryEvent[]>([]);
  const [queryMetrics, setQueryMetrics] = useState();
  const [selectedQueries, setSelectedQueries] = useState<string[]>([]);
  const [unableToFindQueryClient, setUnableToFindQueryClient] = useState(false);

  // adds event listeners when component mounts
  useEffect(() => {
    // connects to background.js
    let port = chrome.runtime.connect({ name: 'devtools-panel' });

    console.log('TESTING');
    // listents for messages from npm package
    port.onMessage.addListener((message) => {
      // handle errors where custom component is outside of query client provider
      console.log('message: ', message);
      if (message.type === 'event' && message.event && message.event.unableToFindQueryClient === true) {
        setUnableToFindQueryClient(true)
        console.log('unableToFindQueryClient');
      } else if (message.type === 'event') {
        setQueryEvents((queryEvents) => [...queryEvents, message.event]);
        setUnableToFindQueryClient(false); // reset it so that user doesn't need to refresh page?
      }

      if (message.type === 'metric') {
        console.log(message.metric);
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
    saveSelectedQueryKeys(queries);
  };

  if (unableToFindQueryClient) {
    return (
      <>
        <Typography>Please ensure the ReactQueryRewind component is inside your query client provider</Typography>
      </>
    )
  }
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ParentTab
        // queryOptions={queryOptions}
        queryEvents={queryEvents}
        selectedQueries={selectedQueries}
        handleSelectionChange={handleSelectionChange}
      />
    </Container>
  );
}

export default App;
