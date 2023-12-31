//content script accesses current DOM of tab the user is currently in
let script;

window.addEventListener("message", (event) => {
  // Validate the message origin and structure
  if (event.source === window && event.data.type && event.data.type === "react-query-rewind") {
    // Handle the data
    const message = event.data.payload;
    chrome.runtime.sendMessage(null, message);
    console.log("message: ", message);
  }
});

//inject script into current DOM
const inject = (fileName) => {
  console.log("CONTENTSCRIPT.JS: INJECTING SCRIPT");
  script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", chrome.runtime.getURL(fileName));
  document.body.appendChild(script);
  console.log("CONTENTSCRIPT.JS: SCRIPT INJECTION SUCCESSFULL");
};

//invoke inject function to inject script
inject("inject.js");

//wait for message from inject.js, when recieved send another message to app.tsx
window.addEventListener("message", (event) => {
  console.log("message from inject.js", event.data.eventListStr);
  if (event.data.type && event.data.type === "EVENT_LIST") {
    console.log("event", event);
    chrome.runtime.sendMessage({
      action: event.data.type,
      data: event.data.eventListStr,
    });
  }
});

//testing
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle the message received from the popup
  console.log("message received from popup");
  const event = new CustomEvent("CustomEventFromContentScript", {
    detail: { message: "Hello from content script!" },
  });
  document.dispatchEvent(event);
  console.log(message);
});