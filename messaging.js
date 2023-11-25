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

// content script listening for message from the injected script/window and sends message to background
// window.addEventListener('message', (event) => {
//     chrome.runtime.sendMessage(event.data);
//   });
  
//   //add a listener for messages from background.. can send message to injected script
//   chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//     //this log is a test from background that makes sure content script is connected and working
//     if (req.body === 'TIMETRAVEL') {
//       window.postMessage({body: 'TIMETRAVEL', previousState: req.previousState});
//     }
//   });
  
  
//   function injectScript(file, node) {
//     const body0 = document.getElementsByTagName(node)[0];
//     const s0 = document.createElement('script'); 
//     s0.setAttribute('type', 'text/javascript');
//     //built in chrome method to get the path of the file to be injected to the user's app
//     s0.setAttribute('src', chrome.runtime.getURL(file));
//     body0.appendChild(s0);
//   }
  
//   injectScript('inserted-script.js', 'body');