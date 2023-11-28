//declare background port
let devToolsPort = null;

chrome.runtime.onConnect.addListener(function(port) {
    devToolsPort = port;
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        message = msg;
        console.log(msg);
        port.postMessage({message: message});
        return true;
    })
    port.onMessage.addListener(function(msg) {
        // Handle messages from DevTools panel
    });

    port.onDisconnect.addListener(function() {
        devToolsPort = null;
    });
});

