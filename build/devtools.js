// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create(
  "RQRewind",
  null,
  "panel.html",
  function (panel) {}
);
