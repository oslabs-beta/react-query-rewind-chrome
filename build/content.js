window.addEventListener("message", (event) => {
  // Validate the message origin and structure
  if (event.source === window && event.data.type && event.data.type === "react-query-rewind") {
    // Handle the data
    const message = event.data.payload;
    chrome.runtime.sendMessage(null, message);
    console.log("message: ", message);
  }
});

// chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//   // This log is a test from the background script to ensure the content script is connected and working
//   if (req.body === 'TIMETRAVEL') {
//     window.postMessage({ body: 'TIMETRAVEL', previousState: req.previousState });
//   }
// });