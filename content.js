document.addEventListener('mouseup', () => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.storage.sync.get("targetLang", (data) => {
            let targetLang = data.targetLang || "en";
            let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(selectedText)}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    let translation = data[0].map(item => item[0]).join('');
                    alert(`Translated: ${translation}`);
                })
                .catch(() => alert('Translation failed.'));
        });
    }
});