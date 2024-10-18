const allowedDomains = ["example.com", "anotherdomain.com"];
const instanceUrl = "https://seedbomb.au/events/new";


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

  const urlSearchParms = new URLSearchParams({
    event_title: eventTitle, 
    venue_name: venueName,
    date_start: dateStart
  }).toString();

  const generatedUrl = `${instanceUrl}?${urlSearchParms}`;
  alert(generatedUrl);

  // chrome.tabs.query({active: true},([tab])=> {
  //   const url = new URL(tab.url);
  //   const domain = url.hostname;
  //   alert(domain);
  //   chrome.tabs.create({url: targetUrl})
  // });
  
  // console.log("onClicked");
  // const url = new URL(tab.url);
  // if (allowedDomains.includes(url.hostname)) {
  //   console.log("This domain is allowed.");
  //   browserAPI.windows.create({ url: targetUrl, type: "popup" });
  // } else {
  //   alert("This domain is not allowed.");
  // }
});