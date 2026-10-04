// Windows93's browser app is "Cat Explorer", registered in
// /c/programs/network/CatExplorer/app.manifest.json5 (width 640, height 480,
// document ./index.html). That page loads standalone from windows93.net.
const APP_URL = "https://windows93.net/c/programs/network/CatExplorer/index.html";
const KEY = "w93WindowId";

async function openBrowser() {
  const { [KEY]: id } = await chrome.storage.session.get(KEY);
  if (id !== undefined) {
    try {
      return await chrome.windows.get(id); // already open, leave it alone
    } catch (_) {
      // closed; create a new one
    }
  }

  const win = await chrome.windows.create({
    url: APP_URL,
    type: "popup",
    width: 640,
    height: 480,
    focused: false
  });
  await chrome.storage.session.set({ [KEY]: win.id });
  return win;
}

chrome.action.onClicked.addListener(openBrowser);

chrome.windows.onRemoved.addListener(async (closedId) => {
  const { [KEY]: id } = await chrome.storage.session.get(KEY);
  if (id === closedId) await chrome.storage.session.remove(KEY);
});
