// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.

// In this example, messages are JSON objects
// {
//   action: ['code'|'script'|'message'], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }

//createChannel create communication channel between content script and background page of extension
(function createChannel() {
    //Create a port with background page for continous message communication
    var port = chrome.extension.connect({
        name: "Communication RQRewind" //Name for identification
    });

    // Listen to messages from the background page
    //When message is received, updates content of element w/ID insertmessagebutton w/content of message
    port.onMessage.addListener(function (message) {
      document.querySelector('#insertmessagebutton').innerHTML = message.content;
      // port.postMessage(message);
    });

}());

// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}