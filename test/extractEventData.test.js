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
    const document = new JSDOM(
        readHTMLFile("approval/example_humanitix_input.html"),
    ).window.document
    const website = "events.humanitix.com/example"
    const humanitix = sites[0]
    const result = extractKoalagatorEventInfoFrom(humanitix, document, website)

    verifyAsJSON(__dirname, "humanatix-sample", result, done)
})

function readHTMLFile(filePAth) {
    return fs.readFileSync(path.join(__dirname, filePAth), "utf-8")
}
