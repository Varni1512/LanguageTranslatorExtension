chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translateText",
        title: "Translate Selected Text",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translateText") {
        chrome.storage.sync.get("targetLang", (data) => {
            let targetLang = data.targetLang || "en";
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                function: translateSelection,
                args: [targetLang]
            });
        });
    }
});

function translateSelection(targetLang) {
    let text = window.getSelection().toString();
    if (!text) return;
    
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            alert('Translation: ' + data[0].map(item => item[0]).join(''));
        })
        .catch(() => alert('Translation failed.'));
}