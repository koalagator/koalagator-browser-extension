import SiteData from "../site_data";
import BaseSite from "./base";

class SelectorSite extends BaseSite {
    constructor(properties) {
        super();

        this.domainName = properties.domain_name;
        this.eventTitle = properties.event_title;
        this.venueName = properties.venue_name;
        this.description = properties.description;
        this.dateStart = properties.date_start;
        this.dateStartAttr = properties.date_start_attr;
        this.dateEnd = properties.date_end;
        this.dateEndAttr = properties.date_end_attr;
    }

    check(url) {
        return this.domainName.test(url);
    }

    parse() {
        let dateStart = document.querySelector(this.dateStart);

        if (this.dateStartAttr) {
            dateStart = dateStart?.getAttribute(this.dateStartAttr);
        } else {
            dateStart = dateStart?.innerText;
        }

        let dateEnd = document.querySelector(this.dateEnd);

        if (this.dateEndAttr) {
            dateEnd = dateEnd?.getAttribute(this.dateEndAttr);
        } else {
            dateEnd = dateEnd?.innerText;
        }

        const jsonNodes = document.querySelectorAll(
            "script[type='application/ld+json']",
        );
        for (const node of jsonNodes) {
            const data = JSON.parse(node.innerHTML);
            if (data.startDate) dateStart = data.startDate;
            if (data.endDate) dateEnd = data.endDate;
        }

        const eventTitle = document.querySelector(this.eventTitle)?.innerText;
        const venueName = document.querySelector(this.venueName)?.innerText;
        const description = document.querySelector(this.description)?.innerText;

        return new Promise((resolve, _error) => {
            resolve(
                new SiteData(
                    eventTitle,
                    venueName,
                    description,
                    dateStart,
                    dateEnd,
                    location.href,
                ),
            );
        });
    }
}

export default SelectorSite;
