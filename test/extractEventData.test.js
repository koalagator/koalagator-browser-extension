import { configure, verifyAsJSON } from "approvals"
import { test } from "vitest"
configure({
    reporters: ["meld"],
})

test("extract event data from saved Eventbrite page", (done) => {
    const site = {
        domain_name: "www.eventbrite.com",
        event_title: ".event-title",
        venue_name: ".location-info__address-text",
        description: "#event-description",
        date_start: "[property='event:start_time']",
        date_end: "[property='event:end_time']",
        date_start_attr: "content",
        date_end_attr: "content",
    }

    const result = site
    verifyAsJSON(__dirname, "eventbrite-sample", result, done)
})
