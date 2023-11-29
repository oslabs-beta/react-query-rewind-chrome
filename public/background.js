//declare background port

// chrome.storage.local.get(['message'],(res) => {
//     console.log(res);
// } )

let devToolsPort = null;

chrome.runtime.onConnect.addListener(function (port) {
  console.log('Background Connected');
  devToolsPort = port;

  port.onMessage.addListener(function (msg) {
    // Handle messages from DevTools panel
  });

  port.onDisconnect.addListener(function () {
    devToolsPort = null;
  });
});

chrome.runtime.onMessage.addListener((newEvent, sender, sendResponse) => {
  // message = msg;
  // console.log(msg);
  if (devToolsPort) {
    devToolsPort.postMessage({ event: newEvent });
  }
  return true;
});
