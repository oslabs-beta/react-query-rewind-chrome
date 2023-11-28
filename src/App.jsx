import React from "react";
import "./App.css";
import { useState } from "react";
import ListItem from "./ListItem";
import BasicTabs from "./BasicTabs";

function App() {
  let port = chrome.runtime.connect({ name: "devtools-panel" });
  const [list, setList] = useState([]);

  // port.postMessage({greeting: "hello from DevTools panel"});

  port.onMessage.addListener(function (msg) {
    if (msg.message.data) {
      const newList = [...list];
      newList.push(msg);
      setList(newList);
    } else {
      console.log("here");
      setList([]);
    }

    // Handle messages from background script
  });

  const items = list.map((msg, i) => <ListItem msg={msg} key={i} />);

  return (
    <div className="App">
      <div>
        <BasicTabs />
      </div>
      <div>{items}</div>
    </div>
  );
}

export default App;
