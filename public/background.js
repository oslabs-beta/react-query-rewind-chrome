let devToolsPort = null;

chrome.runtime.onConnect.addListener(function (port) {
  console.log("Background Connected");

  if (port.name === "devtool panel") {
    devToolsPort = port;
  }
});

const listener = (newEvent, sender, sendResponse) => {
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
        queryKey: newEvent.queryKey,
        queryData: newEvent.queryData,
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
chrome.runtime.onMessage.addListener(listener);
