import React from 'react';
import "./App.css"
import { useState } from 'react';
import ListItem from './ListItem';


function App() {
  let port = chrome.runtime.connect({name: "devtools-panel"});
  const[list, setList] = useState([]);

  // port.postMessage({greeting: "hello from DevTools panel"});
  
  port.onMessage.addListener(function(msg) {
    const newList = [...list];
    newList.push(msg);
    setList(newList);
      // Handle messages from background script
  });

  const items = list.map((msg, i) => <ListItem msg={msg} key={i}/>)
  
  return (
    <div className="App">
      {items}
    </div>
  );
}

export default App;
