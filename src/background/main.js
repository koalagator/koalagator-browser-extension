import imgReady48 from "/assets/icons/ready48.png";
import imgLoading48 from "/assets/icons/loading48.png";
import imgInactive48 from "/assets/icons/inactive48.png";
import SiteData from "../content/site_data";

const instanceDomain = "seedbomb.au";
const instanceUrl = `https://${instanceDomain}/events/new`;

// Use the browser namespace if available, otherwise fall back to chrome
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

let activeTabId = null;
let siteData = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (sender.tab.id !== activeTabId) return;

    let imagePath;

    if (request.data) {
        siteData = SiteData.deserialize(request.data);
    }

    if (request.supported) {
        if (siteData) {
            imagePath = imgReady48;
        } else {
            imagePath = imgLoading48;
        }
    } else {
        imagePath = imgInactive48;
        siteData = null;
    }

    chrome.browserAction.setIcon({ path: imagePath });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    // set icon to inactive on first arrive in a tab (pre-checking)
    const inactiveImagePath = imgInactive48;
    chrome.browserAction.setIcon({ path: inactiveImagePath });
    //detect the current Tab Id
    const tabId = activeInfo.tabId;
    activeTabId = tabId;
    chrome.tabs.sendMessage(tabId, { message: "runCheck" });
});

browserAPI.browserAction.onClicked.addListener(async () => {
    if (!siteData) return;

    chrome.tabs.create({ url: siteData.toURLString(instanceUrl) });
});
