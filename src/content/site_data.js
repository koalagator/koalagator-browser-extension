import dateFormat from "dateformat";
import { stripURL } from "../util";

class SiteData {
    static deserialize(data) {
        return new SiteData(...data);
    }

    constructor(
        eventTitle,
        venueName,
        description,
        dateStart,
        dateEnd,
        website,
    ) {
        this.eventTitle = eventTitle;
        this.venueName = venueName;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.website = website;
    }

    toURLString(instanceUrl) {
        const urlSearchParms = new URLSearchParams({
            "event[title]": this.eventTitle,
            "event[start_time]": this.dateStart,
            "event[end_time]": this.dateEnd,
            "event[url]": stripURL(this.website),
            "event[description]": this.description,
            venue_name: this.venueName,
        }).toString();

        return `${instanceUrl}?${urlSearchParms}`;
    }

    autofill() {
        const dateStart = Date.parse(this.dateStart);
        const dateEnd = Date.parse(this.dateEnd);

        const mapping = {
            "event_title": this.eventTitle,
            "venue_name": this.venueName,
            "event_url": stripURL(this.website),
            "event_description": this.description,
            "date_start": dateFormat(dateStart, "yyyy-mm-dd"),
            "time_start": dateFormat(dateStart, "hh:MM TT"),
            "date_end": dateFormat(dateEnd, "yyyy-mm-dd"),
            "time_end": dateFormat(dateEnd, "hh:MM TT"),
        }

        Object.entries(mapping).forEach((id, value) => {
            const input = document.getElementById(id);
            if (!input) { return; }

            input.value = value;
        });
    }

    serialize() {
        return [
            this.eventTitle,
            this.venueName,
            this.description,
            this.dateStart,
            this.dateEnd,
            this.website,
        ];
    }
}

export default SiteData;
