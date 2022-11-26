// When we are passing messages between the context script and background script we need a receiver.
// Here we receive the message and check to see if it contains message.google_search
chrome.runtime.onMessage.addListener(async(message, sender, sendResponse, tab) => {
    if (message.google_search) {
       open_tab(message.google_search, tab)
    }
})

// A function to open tabs using the google chrome api.
function open_tab(url, tab) {
    chrome.tabs.create({ url: url});
  }
  

// get the text that is selected and make a direct search url
function vt_search(selection, tab) {
  let vt_search_url = "https://www.virustotal.com/gui/search/" + selection;
  chrome.tabs.create({ url: vt_search_url, index: tab.index + 1 });
}

// We use the chrome runtime api on installed we had a listener to create a context menu item.
// Context menu item docs can be found here: https://developer.chrome.com/docs/extensions/reference/contextMenus/
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "vt",
    title: "Virus Total",
    contexts: ["selection"],
  });
});

// We use the context menu "on clicked" and add an event listener and add our vt_search function when they click our Virus Total Context menu.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // We need to grab the text that the user is selecting.
  let selection = info.selectionText;
  // Instead of doing a huge if else chain, we are using a switch statement.
  switch (info.menuItemId) {
    case "vt":
      vt_search(selection, tab);
      break;

    default:
      break;
  }
});
