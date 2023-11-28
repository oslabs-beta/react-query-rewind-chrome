// Create a tab in the devtools area
chrome.devtools.panels.create(
  "RQRewind",
  null,
  "panel.html",
  function (panel) {}
);

chrome.devtools.network.onNavigated.addListener(() => {
    // This event is fired when the inspected window navigates to a new page.
    // You can use it to trigger a reload of your DevTools extension
    console.log('here')
    // Reload your DevTools extension panel or perform necessary refresh actions here.
    location.reload(); // This reloads the DevTools extension panel itself.
});