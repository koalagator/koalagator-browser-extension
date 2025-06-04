import { configure, verifyAsJSON } from "approvals"
import { test } from "vitest"
import { sites } from "./extractEventData"
import { extractKoalagatorEventInfoFrom } from "../extractEventData"
import fs from "fs"
import path from "path"
import { JSDOM } from "jsdom"

configure({
    reporters: [
        "kompare", // for linux
        // "meld", // for macos
        // "gitdiff", // view diff in terminal
    ],
})

test("extract event data from saved Eventbrite page", (done) => {
    const siteToTest = sites[0] // Make sure this is the correct one for eventbrite
    // Load your saved Eventbrite HTML fixture
    const html = fs.readFileSync(
        path.join(__dirname, "approval/example_input.html"),
        "utf-8",
    )

    const document = new JSDOM(html).window.document
    const website = "events.humanitix.com/example"

    const result = extractKoalagatorEventInfoFrom(siteToTest, document, website)

    verifyAsJSON(__dirname, "eventbrite-sample", result, done)
})
