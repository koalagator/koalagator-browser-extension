const targetUrl = "https://seedbomb.au/events/new"

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("myButton")
    if (!button) {
        console.error("myButton not found in popup")
        return
    }

    button.addEventListener("click", () => {
        browser.windows.create({ url: targetUrl, type: "popup" })
    })
})
