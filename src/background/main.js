import imgReady48 from "/assets/icons/ready48.png";
import imgLoading48 from "/assets/icons/loading48.png";
import imgInactive48 from "/assets/icons/inactive48.png";

import { INSTANCE_URL } from "../constants";

const tabSiteData = {};

function getTabId(data, sender) {
    if (data.message !== "getTabId") return;

    return Promise.resolve(sender.tab.id);
}

function setIcon(data) {
    if (data.message !== "setIcon") return;

    const icons = {
        inactive: imgInactive48,
        loading: imgLoading48,
        ready: imgReady48,
    }

    chrome.browserAction.setIcon({path: icons[data.icon]});
}

function registerSiteData(data, sender) {
    if (data.message !== "registerSiteData") return;
    
    tabSiteData[sender.tab.id] = data.siteData;
}

chrome.runtime.onMessage.addListener(getTabId);
chrome.runtime.onMessage.addListener(setIcon);
chrome.runtime.onMessage.addListener(registerSiteData);

chrome.tabs.onActivated.addListener((activeInfo) => {
    // set icon to inactive on first arrive in a tab (pre-checking)
    const inactiveImagePath = imgInactive48;
    chrome.browserAction.setIcon({ path: inactiveImagePath });
    //detect the current Tab Id
    const tabId = activeInfo.tabId;

    chrome.tabs.sendMessage(tabId, { message: "runCheck" });
});

chrome.tabs.onUpdated.addListener(
    (tabId, _changeInfo, tab) => {
        const siteData = tabSiteData[tab.openerTabId];

        if (!siteData) return;

        chrome.tabs.sendMessage(tabId, { message: "runAutofill", siteData: siteData });
    },
    {urls: [INSTANCE_URL]}
)

chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.create({ url: INSTANCE_URL, openerTabId: tab.id });
});
