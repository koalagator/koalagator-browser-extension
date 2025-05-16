const allowedDomains = ["example.com", "anotherdomain.com"];
const targetUrl = "https://seedbomb.au/events/new";

// JavaScript for your popup
document.getElementById("myButton").addEventListener("click", () => {
	// console.log("Popup Click");
	// alert("Weeee");
	const url = new URL(tab.url);
	chrome.windows.create({ url: targetUrl, type: "popup" });

	// if (allowedDomains.includes(url.hostname)) {
	//   alert("This domain is allowed.");
	//   chrome.windows.create({ url: targetUrl, type: "popup" });
	// } else {
	//   alert("This domain is not allowed.");
	// }
});
