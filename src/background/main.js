import imgReady48 from "/assets/icons/ready48.png";
import imgLoading48 from "/assets/icons/loading48.png";
import imgInactive48 from "/assets/icons/inactive48.png";

import { INSTANCE_URL } from "../constants";

const ICONS = {
    inactive: imgInactive48,
    loading: imgLoading48,
    ready: imgReady48,
};

const tabSiteData = {};

function getTabId(data, sender) {
    if (data.message !== "getTabId") return;

    return Promise.resolve(sender.tab.id);
}

function setIcon(data) {
    if (data.message !== "setIcon") return;

    browser.browserAction.setIcon({ path: ICONS[data.icon] });
}

function registerSiteData(data, sender) {
    if (data.message !== "registerSiteData") return;

    tabSiteData[sender.tab.id] = data.siteData;
}

browser.runtime.onMessage.addListener(getTabId);
browser.runtime.onMessage.addListener(setIcon);
browser.runtime.onMessage.addListener(registerSiteData);

browser.tabs.onActivated.addListener((activeInfo) => {
    // set icon to inactive on first arrive in a tab (pre-checking)
    browser.browserAction.setIcon({ path: imgInactive48 });
    //detect the current Tab Id
    const tabId = activeInfo.tabId;

    browser.tabs.sendMessage(tabId, { message: "runCheck" });
});

browser.tabs.onUpdated.addListener(
    (tabId, _changeInfo, tab) => {
        const siteData = tabSiteData[tab.openerTabId];

        if (!siteData) return;

        browser.tabs.sendMessage(tabId, {
            message: "runAutofill",
            siteData: siteData,
        });
    },
    { urls: [INSTANCE_URL] },
);

browser.browserAction.onClicked.addListener((tab) => {
    if (!tabSiteData[tab.id]) return;

    browser.tabs.create({ url: INSTANCE_URL, openerTabId: tab.id });
});
