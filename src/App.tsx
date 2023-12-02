import './css/styles.css';
import { useState, useEffect } from 'react';
import ParentTab from './containers/ParentTab';
import { QueryEvent } from './types';
import MultiSelect from './components/MultiSelect';

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
  };

  return (
    <div className="App">
      <MultiSelect
        onSelectionChange={handleSelectionChange}
        queryEvents={queryEvents}
      />

      <ParentTab queryEvents={queryEvents} selectedQueries={selectedQueries} />
    </div>
  );
}

export default App;
