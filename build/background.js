let devToolsPort=null;chrome.runtime.onConnect.addListener((function(e){console.log("Background Connected"),"devtool panel"===e.name&&(devToolsPort=e)}));const listener=(e,o,n)=>{console.log("message received from content"),"content script"===e.sender&&devToolsPort.postMessage({event:e.message}),"UpdateUI"===e.sender&&(console.log("mesage for updateUI"),chrome.tabs.query({active:!0,currentWindow:!0},(function(o){chrome.tabs.sendMessage(o[0].id,{sender:"UpdateUI",currentQuery:e.currentQuery})}))),"TimeTravel"===e.sender&&(console.log("mesage for timetravel"),chrome.tabs.query({active:!0,currentWindow:!0},(function(o){chrome.tabs.sendMessage(o[0].id,{sender:"TimeTravel",timeTravel:e.timeTravel})})))};chrome.runtime.onMessage.addListener(listener);