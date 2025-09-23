import { SITES } from "./sites";

function check() {
    const actualHostname = location.hostname.toLowerCase();

    const site = SITES.find((s) => {
        return s.check(actualHostname);
    });

    if (!site) {
        chrome.runtime.sendMessage({ supported: false });
        return;
    }

    chrome.runtime.sendMessage({ supported: true, data: null });

    site.parse().then((siteData) => {
        chrome.runtime.sendMessage({
            supported: true,
            data: siteData.serialize(),
        });
    });
}

check();

document.addEventListener("DOMContentLoaded", check);

chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "runCheck") {
        check();
    }
});
