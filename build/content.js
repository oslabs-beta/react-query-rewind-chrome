window.addEventListener("message", (event) => {
  // Validate the message origin and structure
  if (event.source === window && event.data.type && event.data.type === "react-query-rewind") {
    // Handle the data
    const message = event.data.payload;
    chrome.runtime.sendMessage(null, message);
  }
});
