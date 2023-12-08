let devToolsPort = null;

const connectListener = (port) => {
  console.log("Background Connected");

  if (port.name === "devtool panel") {
    devToolsPort = port;
  }
};
chrome.runtime.onConnect.addListener(connectListener);

const messageListener = (newEvent, sender, sendResponse) => {
  console.log("message received from content");

  if (newEvent.sender === "content script") {
    devToolsPort.postMessage({ event: newEvent.message });
  }

  if (newEvent.sender === "UpdateUI") {
    console.log("mesage for updateUI");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // tabs[0].id is the ID of the active tab
      chrome.tabs.sendMessage(tabs[0].id, {
        sender: "UpdateUI",
        currentQuery: newEvent.currentQuery,
      });
    });
  }
  if (newEvent.sender === "TimeTravel") {
    console.log("mesage for timetravel");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        sender: "TimeTravel",
        timeTravel: newEvent.timeTravel,
      });
    });
  }
};

chrome.runtime.onMessage.addListener(messageListener);

chrome.runtime.onSuspend.addListener(() => {
  chrome.runtime.onConnect.removeListener(connectListener);
  chrome.runtime.onMessage.removeListener(messageListener);
});