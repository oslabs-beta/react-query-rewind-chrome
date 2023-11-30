import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import ListItem from './components/ListItem';
import BasicTabs from './containers/BasicTabs';
import JsonFormatter from './components/JsonFormatter';
import { QueryKey } from '@tanstack/react-query';

type QueryEvent = {
  eventType: string;
  queryKey: QueryKey;
  queryHash: string;
  timestamp: Date;
  queryData?: any;
};

type QueryData = {
  [queryName: string]: {
    updates: QueryEvent[];
  };
};

function App() {
  // state to store changes to query cache
  const [queryData, setQueryData] = useState<QueryData>({});
  const [queryOptions, setQueryOptions] = useState<string[]>([]);
  const [queryEvents, setQueryEvents] = useState<QueryEvent[]>([]);

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

  useEffect(() => {
    const newQueryOptions = queryEvents.map(event => event.queryHash);
    const uniqueQueryOptions = Array.from(new Set(newQueryOptions));
    setQueryOptions(uniqueQueryOptions);
  }, [queryEvents]);

  return (
    <div className="App">
      <div>
        <BasicTabs
          queryData={queryData}
          queryOptions={queryOptions}
          queryEvents={queryEvents}
        />
      </div>
      {/* <div>{items}</div> */}
      {/* <JsonFormatter /> */}
    </div>
  );
}

export default App;
