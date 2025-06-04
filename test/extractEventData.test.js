import { configure, verifyAsJSON } from "approvals"
import { test } from "vitest"
import { sites } from "./extractEventData"
configure({
    reporters: ["kompare"],
})

test("extract event data from saved Eventbrite page", (done) => {
    const siteToTest = sites[0]

    const result = siteToTest
    verifyAsJSON(__dirname, "eventbrite-sample", result, done)
})
