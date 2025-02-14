document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: detectLanguage
        }, (results) => {
            document.getElementById('sourceLang').textContent = results[0].result || 'Unknown';
        });
    });

    document.getElementById('translateBtn').addEventListener('click', () => {
        let targetLang = document.getElementById('targetLanguage').value;
        chrome.storage.sync.set({ targetLang });
        window.close();
    });
});

function detectLanguage() {
    return document.documentElement.lang || navigator.language;
}