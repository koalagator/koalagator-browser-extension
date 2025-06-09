import browser from "webextension-polyfill"

export default defineBackground(() => {
    console.log("Hello background!", { id: browser.runtime.id })

    const instanceDomain = "seedbomb.au"
    const instanceUrl = `https://${instanceDomain}/events/new`

    let eventTitle: string | null = null
    let venueName: string | null = null
    let dateStart: string | null = null
    let dateEnd: string | null = null
    let website: string | null = null
    let description: string | null = null
    let activeTabId: number | null = null
    let supported: boolean = false

    browser.runtime.onMessage.addListener((request, sender) => {
        if (sender.tab?.id !== activeTabId) return

        eventTitle = request.eventTitle
        venueName = request.venueName
        dateStart = request.dateStart
        dateEnd = request.dateEnd
        description = request.description
        website = request.website
        supported = request.supported

        let imagePath: string
        if (supported) {
            if (eventTitle) {
                imagePath = "icons/ready48.png"
            } else {
                imagePath = "icons/loading48.png"
            }
        } else {
            imagePath = "icons/inactive48.png"
        }

        browser.action.setIcon({ path: imagePath })
    })

    browser.tabs.onActivated.addListener((activeInfo) => {
        const inactiveImagePath = "icons/inactive48.png"
        browser.action.setIcon({ path: inactiveImagePath })

        const tabId = activeInfo.tabId
        activeTabId = tabId
        browser.tabs.sendMessage(tabId, { message: "runCheck" })
    })

    browser.action.onClicked.addListener(() => {
        if (!eventTitle) return

        const urlSearchParams = new URLSearchParams({
            "event[title]": eventTitle,
            "event[start_time]": dateStart ?? "",
            "event[end_time]": dateEnd ?? "",
            "event[url]": website ?? "",
            "event[description]": description ?? "",
            venue_name: venueName ?? "",
        }).toString()

        const generatedUrl = `${instanceUrl}?${urlSearchParams}`
        browser.tabs.create({ url: generatedUrl })
    })
})
