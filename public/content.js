window.addEventListener("message", (event) => {
  // Validate the message origin and structure
  if (
    event.source === window &&
    event.data.type &&
    event.data.type === "react-query-rewind"
  ) {
    // Handle the data
    const message = event.data.payload;
    chrome.runtime.sendMessage({ sender: "content script", message: message });
    console.log("message: ", message);
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message received:", message);

  if (message.sender === "UpdateUI") {
    const event = new CustomEvent("UpdateUI", {
      detail: { currentQuery: message.currentQuery },
    });
    window.dispatchEvent(event);
  }
  if (message.sender === 'TimeTravel') {
    const event = new CustomEvent('TimeTravel', {
      detail: { timeTravel: message.timeTravel }
    });
    window.dispatchEvent(event);
  }
});
