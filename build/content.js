let script;window.addEventListener("message",(e=>{if(e.source===window&&e.data.type&&"react-query-rewind"===e.data.type){const t=e.data.payload;chrome.runtime.sendMessage(null,t),console.log("message: ",t)}}));const inject=e=>{console.log("CONTENTSCRIPT.JS: INJECTING SCRIPT"),script=document.createElement("script"),script.setAttribute("type","text/javascript"),script.setAttribute("src",chrome.runtime.getURL(e)),document.body.appendChild(script),console.log("CONTENTSCRIPT.JS: SCRIPT INJECTION SUCCESSFULL")};inject("inject.js"),window.addEventListener("message",(e=>{console.log("message from inject.js",e.data.eventListStr),e.data.type&&"EVENT_LIST"===e.data.type&&(console.log("event",e),chrome.runtime.sendMessage({action:e.data.type,data:e.data.eventListStr}))})),chrome.runtime.onMessage.addListener(((e,t,s)=>{console.log("message received from popup");const o=new CustomEvent("CustomEventFromContentScript",{detail:{message:"Hello from content script!"}});document.dispatchEvent(o),console.log(e)}));