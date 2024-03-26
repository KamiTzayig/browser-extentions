
let focusedWindowId = undefined;
let lastLog = Date.now() - 1000; //make sure the initial log is captured

async function bootstrap() {
  const focusedWindow = await chrome.windows.getLastFocused();
  focusedWindowId = focusedWindow.id;
  loadWindowList();
}

async function loadWindowList() {
  const windowList = await chrome.windows.getAll({ populate: true });
  timestamp = new Date().toISOString();
  timzone = Intl.DateTimeFormat().resolvedOptions().timeZone;// IANA Timezone Identifier
  let state = {
    timestamp: timestamp,
    timezone: timzone,
    windows: windowList.map(window => ({
      id: window.id,
      left: window.left,
      top: window.top,
      width: window.width,
      height: window.height,
      focused: window.focused,
      tabs: window.tabs.map(tab => ({
        windowId: tab.windowId,
        title: tab.title,
        url: tab.url,
        active: tab.active,
        index: tab.index,
      }))
    }))
  };

  timestamp = Date.now();
  if (timestamp - lastLog > 100) {
    console.log("Current State:", state);
  }
  lastLog = Date.now()
  
}

chrome.windows.onCreated.addListener(function (createInfo) {
  loadWindowList();
});

chrome.windows.onBoundsChanged.addListener(function (window) {
  loadWindowList();
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
  focusedWindowId = windowId;
  loadWindowList();
});

chrome.windows.onRemoved.addListener(function (windowId) {
  loadWindowList();
});

chrome.tabs.onCreated.addListener(function (tab) {
  loadWindowList();
});

chrome.tabs.onAttached.addListener(function (tabId, props) {
  loadWindowList();
});


chrome.tabs.onUpdated.addListener(function (tabId, props) {
  loadWindowList()
});

chrome.tabs.onActivated.addListener(function (props) {
  loadWindowList();
});

chrome.tabs.onRemoved.addListener(function (tabId) {
loadWindowList()
});