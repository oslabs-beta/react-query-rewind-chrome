// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
// background page acts as intermediary, facilitating communication between devtools/content
// Can use:
// chrome.tabs.*
// chrome.extension.*

chrome.extension.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {

        if(message.tabId && message.content) {

                //Evaluate script in inspectedPage
                if(message.action === 'code') {
                    chrome.tabs.executeScript(message.tabId, {code: message.content});

                //Attach script to inspectedPage
                } else if(message.action === 'script') {
                    chrome.tabs.executeScript(message.tabId, {file: message.content});

                //Pass message to inspectedPage
                } else {
                    chrome.tabs.sendMessage(message.tabId, message, sendResponse);
                }

        // This accepts messages from the inspectedPage and 
        // sends them to the panel
        } else {
            port.postMessage(message);
        }
        sendResponse(message);
    }

    // Listens to messages sent from the panel
    chrome.extension.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        chrome.extension.onMessage.removeListener(extensionListener);
    });

    // port.onMessage.addListener(function (message) {
    //     port.postMessage(message);
    // });

});
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     return true;
// });
//declare background port
// let backgroundPort;

// //listens for messages from content script and can then send messages to app.jsx
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (backgroundPort) {
//     if (request.body === 'stateSnapshot')
//       backgroundPort.postMessage({ body: request.body, snapshot: request.snapshot });
//     if(request.body === 'hierarchy') 
//       backgroundPort.postMessage({ body: request.body, hierarchy: request.hierarchy});
//   }
// });

// chrome.runtime.onConnect.addListener((port) => {
//   //declaring background port
//   //adding a listener to our port
//   //this listens for messages from app.tsx and has the ability to send messages to content script
//   backgroundPort = port;

//   backgroundPort.onMessage.addListener((message, sender, sendResponse) => {

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       //injects content script into current users tab
//       if (message.body === 'runContentScript') {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           files: ['./js/content-script.js'],
//         });

//       }

//       //sends a message to the previously injected script containing the previous state that the user's store should be udpated to
//       if (message.body === 'TIMETRAVEL') {
//         //send message to content script
//         chrome.tabs.sendMessage(tabs[0].id, {
//           body: 'TIMETRAVEL',
//           previousState: message.previousState
//         });
//       }
//     });
//   });
// });