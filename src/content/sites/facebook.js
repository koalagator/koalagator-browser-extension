import ICAL from "ical.js";
import BaseSite from "./base";
import SiteData from "../site_data";

class FacebookSite extends BaseSite {
  check(url) {
    return /www\.facebook\.com$/.test(url);
  }

  parse() {
    const currentUrl = location.href;
    const eventId = currentUrl.split("events/")[1].split("/")[0];

    return new Promise((result, error) => {
      fetch(`https://www.facebook.com/events/ical/export/?eid=${eventId}`)
        .then((response) => {
          if (!response.ok)
            throw new Error(
              "Failed to fetch iCalendar data. Note: you need to be logged in to Facebook.",
            );
          return response.text();
        })
        .then((icalText) => this._extractEventInfoFrom(icalText))
        .then((eventInfo) => {
          result(
            new SiteData(
              eventInfo.summary, eventInfo.location, eventInfo.description,
              eventInfo.startDate?.toJSDate(), eventInfo.endDate?.toJSDate(), currentUrl
            )
          )
        })
        .catch((error) => {
          if (error.message.includes("e.designSet is undefined")) {
            throw new Error(
              "Facebook has blocked you from extracting any more events to Koalagator. Please try again later.",
            );
          }
          console.error("Error:", error);
        });
    })

  }

  _extractEventInfoFrom(icalText) {
    // Code declared in `scripts/ical.es5.min.cjs`, retrieved from:
    // https://unpkg.com/ical.js@2.1.0/dist/ical.es5.min.cjs.
    return new ICAL.Event(
      new ICAL.Component(ICAL.parse(icalText)).getFirstSubcomponent("vevent"),
    );
  }
}

export default FacebookSite;