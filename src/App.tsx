import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import ListItem from "./components/ListItem";
import BasicTabs from "./containers/BasicTabs";
import JsonFormatter from "./components/JsonFormatter";

function App() {
  const [list, setList] = useState([]);

//  useEffect(() => {
//   let port = chrome.runtime.connect({ name: "devtools-panel" });
//   port.onMessage.addListener((msg) => {
//       setList(prev => [...prev, msg]);
//     // Handle messages from background script
//   });
//  }, []);

//  useEffect(() => {
//   chrome.devtools.network.onNavigated.addListener(() => {
//     // This event is fired when the inspected window navigates to a new page.
//     // You can use it to trigger a reload of your DevTools extension
//     console.log('here');
//     // Reload your DevTools extension panel or perform necessary refresh actions here.
//     window.location.reload(true); // This reloads the DevTools extension panel itself.
// });
//  }, []);

  // const items = list.map((msg, i) => <ListItem msg={msg} key={i} />);

  return (
    <div className="App">
      <div>
        <BasicTabs />
      </div>
      {/* <div>{items}</div> */}
      <JsonFormatter/>
    </div>
  );
}

export default App;
