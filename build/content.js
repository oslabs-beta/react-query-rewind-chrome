window.addEventListener("message",(e=>{if(e.source===window&&e.data.type&&"react-query-rewind"===e.data.type){const t=e.data.payload;chrome.runtime.sendMessage({sender:"content script",message:t}),console.log("message: ",t)}})),chrome.runtime.onMessage.addListener((function(e,t,n){if(console.log("Message received:",e),"UpdateUI"===e.sender){const t=new CustomEvent("UpdateUI",{detail:{currentQuery:e.currentQuery}});window.dispatchEvent(t)}if("TimeTravel"===e.sender){const t=new CustomEvent("TimeTravel",{detail:{timeTravel:e.timeTravel}});window.dispatchEvent(t)}}));