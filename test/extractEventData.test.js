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

test("extract event data from example Humanitix page", (done) => {
    const filePAth = "approval/example_humanitix_input.html"
    const htmlFile = fs.readFileSync(path.join(__dirname, filePAth), "utf-8")
    const document = new JSDOM(htmlFile).window.document
    const website = "events.humanitix.com/example"
    const humanitix = sites[0]
    const result = extractKoalagatorEventInfoFrom(humanitix, document, website)

    verifyAsJSON(__dirname, "eventbrite-sample", result, done)
})
