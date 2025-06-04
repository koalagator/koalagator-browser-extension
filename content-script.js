import { sites } from "./extractEventData"

const check = () => {
    const actualHostname = location.hostname.toLowerCase()
    const site = sites.find((s) => s.domain_name === actualHostname)
    if (!site) {
        chrome.runtime.sendMessage({ supported: false })
        return
    }

    if (site.domain_name === facebook.domain_name) return handleFacebookIcal()

    chrome.runtime.sendMessage(extractKoalagatorEventInfoFrom(site))
}

check()
document.addEventListener("DOMContentLoaded", check)
chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "runCheck") {
        check()
    }
})

function handleFacebookIcal() {
    const currentUrl = location.href
    const eventId = currentUrl.split("events/")[1].split("/")[0]
    fetch(`https://www.facebook.com/events/ical/export/?eid=${eventId}`)
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    "Failed to fetch iCalendar data. Note: you need to be logged in to Facebook.",
                )
            return response.text()
        })
        .then((icalText) => extractEventInfoFrom(icalText))
        .then((eventInfo) => ({
            website: currentUrl,
            supported: true,
            eventTitle: eventInfo.summary,
            venueName: eventInfo.location,
            dateStart: eventInfo.startDate?.toJSDate(),
            dateEnd: eventInfo.endDate?.toJSDate(),
            description: eventInfo.description,
        }))
        .then((koalagatorEvent) => chrome.runtime.sendMessage(koalagatorEvent))
        .catch((error) => {
            if (error.message.includes("e.designSet is undefined")) {
                throw new Error(
                    "Facebook has blocked you from extracting any more events to Koalagator. Please try again later.",
                )
            }
            console.error("Error:", error)
        })
}

function extractEventInfoFrom(icalText) {
    // Code declared in `scripts/ical.es5.min.cjs`, retrieved from:
    // https://unpkg.com/ical.js@2.1.0/dist/ical.es5.min.cjs.
    return new ICAL.Event(
        new ICAL.Component(ICAL.parse(icalText)).getFirstSubcomponent("vevent"),
    )
}
