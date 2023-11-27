window.addEventListener("message", (event) => {
  // Validate the message origin and structure
  if (event.source === window && event.data.type && event.data.type === "react-query-rewind") {
    // Handle the data
    const message = event.data.payload;
    // console.log("Data received from page:", event.data.payload);
    // chrome.storage.local.set({
    //   message,
    // });
    chrome.runtime.sendMessage(null, message);
  }
});
