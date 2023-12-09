//declare background port
let devToolsPort = null;

//log message to show connection 
chrome.runtime.onConnect.addListener(function (port) {
  console.log('Background Connected');
  devToolsPort = port;
});

//when message is received, if devtoolsport is connected forward message to devtools panel
chrome.runtime.onMessage.addListener((newEvent, sender, sendResponse) => {
  if (devToolsPort) {
    devToolsPort.postMessage({ event: newEvent });
  }
});
