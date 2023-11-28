let port = chrome.runtime.connect({name: "devtools-panel"});

port.onMessage.addListener(function(msg) {
    const item = document.createElement('div');
    item.innerHTML = msg.message.type;
    document.body.appendChild(item);
    console.log(msg.message);
    // Handle messages from background script
});