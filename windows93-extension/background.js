const W93_URL = "https://windows93.net/";
const KEY = "w93WindowId";

async function openWindow(url = W93_URL) {
  // Reuse the existing Windows93 window if it is still open.
  const { [KEY]: id } = await chrome.storage.session.get(KEY);
  if (id !== undefined) {
    try {
      const win = await chrome.windows.get(id, { populate: true });
      const tab = win.tabs && win.tabs[0];
      if (tab && url !== W93_URL) await chrome.tabs.update(tab.id, { url });
      return win;
    } catch (_) {
      // window was closed; fall through and create a new one
    }
  }

  const win = await chrome.windows.create({
    url,
    type: "popup",
    width: 1024,
    height: 768,
    focused: false
  });
  await chrome.storage.session.set({ [KEY]: win.id });
  return win;
}

chrome.action.onClicked.addListener(() => openWindow());

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "w93-open-link",
    title: "Open link in Windows93 window",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "w93-open-link" && info.linkUrl) openWindow(info.linkUrl);
});

chrome.windows.onRemoved.addListener(async (closedId) => {
  const { [KEY]: id } = await chrome.storage.session.get(KEY);
  if (id === closedId) await chrome.storage.session.remove(KEY);
});
