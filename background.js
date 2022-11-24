// get the text that is selected and make a direct search url
function vt_search(selection, tab) {
    let vt_search_url = 'https://www.virustotal.com/gui/search/' + selection
    chrome.tabs.create({url: vt_search_url, index:tab.index+1})
}

chrome.runtime.onInstalled.addListener( () => {
    chrome.contextMenus.create({
        id: 'vt',
        title: 'Virus Total',
        contexts: ['selection']
    })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    let selection = info.selectionText
    switch (info.menuItemId) {
        case 'vt':
            vt_search(selection, tab)
            break;
    
        default:
            break;
    }
})