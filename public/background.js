// //declare background port
// let devToolsPort = null;

// //log message to show connection 
// chrome.runtime.onConnect.addListener(function (port) {
//   console.log('Background Connected');
//   devToolsPort = port;
// });

// //when message is received, if devtoolsport is connected forward message to devtools panel
// chrome.runtime.onMessage.addListener((newEvent, sender, sendResponse) => {
//   if (devToolsPort) {
//     devToolsPort.postMessage({ event: newEvent });
//   }
// });

let devToolsPort = null;

const connectListener = (port) => {
  console.log('Background Connected');

  if (port.name === 'devtools-panel') {
    devToolsPort = port;
  }
  return true;
};
chrome.runtime.onConnect.addListener(connectListener);

const messageListener = async (newEvent, sender, sendResponse) => {
  console.log('message received from content');

  if (newEvent.sender === 'content script' && devToolsPort) {
    console.log('send to devtool panel');
    devToolsPort.postMessage({ event: newEvent.message, type: 'event' });
  }

  if (newEvent.sender === 'UpdateUI') {
    console.log('mesage for updateUI');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // tabs[0].id is the ID of the active tab
      chrome.tabs.sendMessage(tabs[0].id, {
        sender: 'UpdateUI',
        currentQuery: newEvent.currentQuery,
      });
    });
  }
  if (newEvent.sender === 'TimeTravel') {
    console.log('mesage for timetravel');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        sender: 'TimeTravel',
        timeTravel: newEvent.timeTravel,
      });
    });
  }
  return true;
};

chrome.runtime.onMessage.addListener(messageListener);

chrome.runtime.onSuspend.addListener(() => {
  chrome.runtime.onConnect.removeListener(connectListener);
  chrome.runtime.onMessage.removeListener(messageListener);
});

