import { configure, verifyAsJSON } from "approvals"
import { test } from "vitest"
import { sites } from "./extractEventData"

configure({
    reporters: [
        "kompare", // for linux
        // "meld", // for macos
        // "gitdiff", // view diff in terminal
        // See supported diff reporters here: https://github.com/approvals/Approvals.NodeJS#built-in-reporters
    ],
})

test("extract event data from saved Eventbrite page", (done) => {
    const siteToTest = sites[0]

    const result = siteToTest
    // const result = extractKoalagatorEventInfoFrom(siteToTest)
    verifyAsJSON(__dirname, "eventbrite-sample", result, done)
})
