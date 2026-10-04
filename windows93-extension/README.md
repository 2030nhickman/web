# Windows93 Cat Explorer

Chrome (MV3) extension. Click the toolbar icon to open Windows93's actual browser
app, **Cat Explorer** (`/c/programs/network/CatExplorer/index.html` on windows93.net),
in its own 640x480 popup window via `chrome.windows.create({ focused: false })`.

How it was found: the OS ships as `https://windows93.net/42.tar.gz` plus
`files.cbor`; the only app in the "Browser" category is `CatExplorer`
(`app.manifest.json5`: width 640, height 480, `document: "./index.html"`).
The page loads standalone from its URL, with its own Back/Forward/Home/Reload
buttons and Location bar.

Install: `chrome://extensions` → Developer mode → Load unpacked → this folder.
Not tested in a live Chrome. If the window is already open, clicking again does nothing.
