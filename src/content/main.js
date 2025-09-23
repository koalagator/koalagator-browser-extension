import SiteData from "./site_data";
import { SITES } from "./sites";

function check() {
    const actualHostname = location.hostname.toLowerCase();

    const site = SITES.find((s) => {
        return s.check(actualHostname);
    });

    if (!site) {
        browser.runtime.sendMessage({ message: "setIcon", icon: "inactive" });
        return;
    }

    browser.runtime.sendMessage({ message: "setIcon", icon: "loading" });

    site.parse().then(siteData => {
        browser.runtime.sendMessage({ message: "setIcon", icon: "ready" });
        browser.runtime.sendMessage({ message: "registerSiteData", siteData: siteData.serialize() })
    });
}

function autoFill(data) {
    const siteData = SiteData.deserialize(data.siteData);
    siteData.autofill();
}

check();

document.addEventListener("DOMContentLoaded", check);

browser.runtime.onMessage.addListener((data) => {
    if (data.message === "runCheck") return check();
    if (data.message === "runAutofill") return autoFill(data);
});
