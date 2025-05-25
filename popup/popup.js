const allowedDomains = ["example.com", "anotherdomain.com"]
const targetUrl = "https://seedbomb.au/events/new"

// JavaScript for your popup
document.getElementById("myButton").addEventListener("click", () => {
    chrome.windows.create({ url: targetUrl, type: "popup" })
})
