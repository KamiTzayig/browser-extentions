chrome.tabs.onUpdated.addListener(async(tabId, tab) => {
    if (tab.url ) {
      console.log(tab.url)
      console.log("update")
      let a = await chrome.tabs.query()
      console.log(a)

      chrome.tabs.sendMessage(tabId, {
        type: "UPDATE",
        url: tab.url,
      });
    }
  });


 
  // Gets all tabs that have the specified properties, or all tabs if no properties are specified.

  //chrome.tabs.getAllInWindow() Gets details about all tabs in the specified window.
//(tabs: Tab[])=>void
  
// onRemoved