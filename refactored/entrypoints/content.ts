import ICAL from "ical.js"

export default defineContentScript({
    matches: [
        "*://*.google.com/*",
        "*://*.humanitix.com/*",
        "*://*.eventbrite.com/*",
        "*://*.meetup.com/*",
        "*://*.trybooking.com/*",
        "*://*.ti.to/*",
        "*://lu.ma/*",
        "*://*.facebook.com/*",
    ],
    runAt: "document_idle", // WXT will wait for DOMContentLoaded by default
    main() {
        check()

        browser.runtime.onMessage.addListener((request) => {
            if (request.message === "runCheck") {
                check()
            }
        })
    },
})

const humanitix: any = {
    domain_name: "events.humanitix.com",
    event_title: "[data-testid='title']",
    venue_name: ".detail.location .f-label-3",
    description: ".EventDescription .RichContent",
    date_start: ".detail.datetime time",
    date_start_attr: "datetime",
}

const eventbrite: any = {
    domain_name: "www.eventbrite.com",
    event_title: ".event-title",
    venue_name: ".location-info__address-text",
    description: "#event-description",
    date_start: "[property='event:start_time']",
    date_end: "[property='event:end_time']",
    date_start_attr: "content",
    date_end_attr: "content",
}

const meetup: any = {
    domain_name: "www.meetup.com",
    schema_org: true,
    event_title: "main h1",
    venue_name: "[data-event-label='event-location']",
    description: "#event-details",
    date_start: "#event-info time",
    date_start_attr: "datetime",
}

const trybooking: any = {
    domain_name: "www.trybooking.com",
    schema_org: true,
    event_title: ".event-name",
    venue_name: "[data-event-label='event-location']",
    description: "#default-eventname",
    date_start: "span[data-tb-session]",
    date_start_attr: "data-tb-session",
}

const luma: any = {
    domain_name: "lu.ma",
    schema_org: true,
    event_title: ".title",
    venue_name: ".tito-venues span",
    description: ".tito-description",
    date_start: "#tito-basic-info a",
    date_start_attr: "",
}

const tito: any = {
    domain_name: "ti.to",
    event_title: ".event-title",
    venue_name: ".content-card .fw-medium",
    description: ".tito-description",
    date_start: "#tito-basic-info a",
    date_start_attr: "",
}

const facebook: any = {
    domain_name: "www.facebook.com",
    // data is empty here, since facebook event info is extracted from the event ical,
    // rather than from the page itself.
}

const sites: any[] = [
    humanitix,
    eventbrite,
    meetup,
    trybooking,
    tito,
    luma,
    facebook,
]

async function check() {
    const actualHostname = location.hostname.toLowerCase()
    const site = sites.find((s) => s.domain_name === actualHostname)

    if (!site) {
        await browser.runtime.sendMessage({ supported: true })
        return
    }

    if (site.domain_name === facebook.domain_name) {
        return handleFacebookIcal()
    }

    const eventInfo = extractKoalagatorEventInfoFrom(site)
    await browser.runtime.sendMessage(eventInfo)
}

function extractKoalagatorEventInfoFrom(site: any) {
    let dateStart: string
    let dateEnd: string

    const dateStartNode = document.querySelector(site.date_start)
    dateStart = site.date_start_attr
        ? (dateStartNode?.getAttribute(site.date_start_attr) ?? null)
        : (dateStartNode?.textContent ?? null)

    const dateEndNode = document.querySelector(site.date_end)
    dateEnd = site.date_end_attr
        ? (dateEndNode?.getAttribute(site.date_end_attr) ?? null)
        : (dateEndNode?.textContent ?? null)

    document
        .querySelectorAll("script[type='application/ld+json']")
        .forEach((node) => {
            try {
                const data = JSON.parse(node.textContent ?? "")
                if (data.startDate) dateStart = data.startDate
                if (data.endDate) dateEnd = data.endDate
            } catch {
                /* ignore invalid JSON */
            }
        })

    return {
        eventTitle:
            document.querySelector(site.event_title ?? "")?.textContent ?? null,
        venueName:
            document.querySelector(site.venue_name ?? "")?.textContent ?? null,
        description:
            document.querySelector(site.description ?? "")?.textContent ?? null,
        dateStart,
        dateEnd,
        supported: true,
        website: location.href,
    }
}

async function handleFacebookIcal() {
    const currentUrl = location.href
    const eventId = currentUrl.split("events/")[1]?.split("/")[0]

    if (!eventId) return

    try {
        const response = await fetch(
            `https://www.facebook.com/events/ical/export/?eid=${eventId}`,
        )
        if (!response.ok) throw new Error("Failed to fetch iCalendar data")

        const icalText = await response.text()
        const vevent = new ICAL.Component(
            ICAL.parse(icalText),
        ).getFirstSubcomponent("vevent")
        if (!vevent) throw new Error("No vevent found in iCalendar data")
        const event = new ICAL.Event(vevent)

        const eventInfo = {
            website: currentUrl,
            supported: true,
            eventTitle: event.summary,
            venueName: event.location,
            dateStart: event.startDate.toJSDate(),
            dateEnd: event.endDate?.toJSDate(),
            description: event.description,
        }

        await browser.runtime.sendMessage(eventInfo)
    } catch (error) {
        console.error("Error handling Facebook iCal", error)
    }
}
