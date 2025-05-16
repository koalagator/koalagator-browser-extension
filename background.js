const instanceDomain = "seedbomb.au";
const instanceUrl = `https://${instanceDomain}/events/new`;

// Use the browser namespace if available, otherwise fall back to chrome
const browserAPI = typeof browser !== "undefined" ? browser : chrome;
let eventTitle = null;
let venueName = null;
let dateStart = null;
let dateEnd = null;
let website = null;
let description = null;
let activeTabId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	// __AUTO_GENERATED_PRINT_VAR_START__
	console.log(" request: %s", request); // __AUTO_GENERATED_PRINT_VAR_END__
	if (sender.tab.id !== activeTabId) return;

	eventTitle = request.eventTitle;
	venueName = request.venueName;
	dateStart = request.dateStart;
	dateEnd = request.dateEnd;
	description = request.description;
	website = request.website;
	supported = request.supported;

	let imagePath;
	if (supported) {
		if (eventTitle) {
			imagePath = "icons/ready48.png";
		} else {
			imagePath = "icons/loading48.png";
		}
	} else {
		imagePath = "icons/inactive48.png";
	}
	chrome.browserAction.setIcon({ path: imagePath });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
	// set icon to inactive on first arrive in a tab (pre-checking)
	const inactiveImagePath = "icons/inactive48.png";
	chrome.browserAction.setIcon({ path: inactiveImagePath });
	//detect the current Tab Id
	const tabId = activeInfo.tabId;
	activeTabId = tabId;
	chrome.tabs.sendMessage(tabId, { message: "runCheck" });
});

browserAPI.browserAction.onClicked.addListener(async () => {
	if (!eventTitle) return;

	const urlSearchParms = new URLSearchParams({
		"event[title]": eventTitle,
		"event[start_time]": dateStart,
		"event[end_time]": dateEnd,
		"event[url]": website,
		"event[description]": description,
		venue_name: venueName
	}).toString();

	const generatedUrl = `${instanceUrl}?${urlSearchParms}`;
	chrome.tabs.create({ url: generatedUrl });

	// console.log("onClicked");
	// const url = new URL(tab.url);
	// if (allowedDomains.includes(url.hostname)) {
	//   console.log("This domain is allowed.");
	//   browserAPI.windows.create({ url: targetUrl, type: "popup" });
	// } else {
	//   alert("This domain is not allowed.");
	// }
});
