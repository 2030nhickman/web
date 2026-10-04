# Windows93 Browser Window

Chrome (MV3) extension. Click the toolbar icon to open https://windows93.net in a
separate popup window created with `chrome.windows.create({ focused: false })`,
so it opens in the background without taking focus. Right-click any link →
"Open link in Windows93 window" to load that URL in the same window.

Install: `chrome://extensions` → enable Developer mode → Load unpacked → select this folder.

Note: I haven't tested this against the live site, and I don't know of a public
API for Windows93's internal browser, so this opens the site itself in its own
window rather than hooking into the page's browser app.
