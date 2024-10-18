const allowedDomains = ["example.com", "anotherdomain.com"];
const targetUrl = "https://seedbomb.au/events/new";

// Use the browser namespace if available, otherwise fall back to chrome
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

browserAPI.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.create({url: "http://localhost:3000/icons/icon128.png"})
  // console.log("onClicked");
  // const url = new URL(tab.url);
  // if (allowedDomains.includes(url.hostname)) {
  //   console.log("This domain is allowed.");
  //   browserAPI.windows.create({ url: targetUrl, type: "popup" });
  // } else {
  //   alert("This domain is not allowed.");
  // }
});