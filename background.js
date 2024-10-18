const instanceDomain = "seedbomb.au"
const instanceUrl = `https://${instanceDomain}/events/new`;

// Use the browser namespace if available, otherwise fall back to chrome
const browserAPI = typeof browser !== "undefined" ? browser : chrome;
let eventTitle = null;
let venueName = null;
let dateStart = null;

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    eventTitle = request.eventTitle;
    venueName = request.venueName;
    dateStart = request.dateStart;
  }
)

browserAPI.browserAction.onClicked.addListener(async() => {
  if (!eventTitle) return;

  const urlSearchParms = new URLSearchParams({
    'event[title]': eventTitle, 
    venue_name: venueName,
    'event[start_time]': dateStart
  }).toString();

  const generatedUrl = `${instanceUrl}?${urlSearchParms}`;
  chrome.tabs.create({url: generatedUrl})

  // console.log("onClicked");
  // const url = new URL(tab.url);
  // if (allowedDomains.includes(url.hostname)) {
  //   console.log("This domain is allowed.");
  //   browserAPI.windows.create({ url: targetUrl, type: "popup" });
  // } else {
  //   alert("This domain is not allowed.");
  // }
});