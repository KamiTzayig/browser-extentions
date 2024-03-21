document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({message: "get_creation_events"}, (response) => {
      if (response) {
        const tabsListElement = document.getElementById('tabsList');
        response.tabs.forEach((tabInfo) => {
          const listItem = document.createElement('li');
          listItem.textContent = tabInfo;
          tabsListElement.appendChild(listItem);
        });
  
        // Assuming you have a separate list or section for windows
        const windowsListElement = document.getElementById('windowsList');
        response.windows.forEach((windowInfo) => {
          const listItem = document.createElement('li');
          listItem.textContent = windowInfo;
          windowsListElement.appendChild(listItem);
        });
      }
    });
  });
  