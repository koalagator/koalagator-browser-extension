import { stripURL } from "../util";

class SiteData {
  static deserialize(data) {
    return new SiteData(...data);
  }

  constructor(eventTitle, venueName, description, dateStart, dateEnd, website) {
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

  serialize() {
    return [
      this.eventTitle, this.venueName, this.description,
      this.dateStart, this.dateEnd, this.website
    ];
  }
}

export default SiteData;