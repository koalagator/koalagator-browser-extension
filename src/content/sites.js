import FacebookSite from "./sites/facebook";
import SelectorSite from "./sites/selector";

// Can't find end time
const SITE_HUMANITIX = new SelectorSite({
  id: "humanitix.com",
  domain_name: /events\.humanitix\.com$/,
  event_title: "[data-testid='title']",
  venue_name: ".detail.location .f-label-3",
  description: ".EventDescription .RichContent",
  date_start: ".detail.datetime time",
  date_start_attr: "datetime",
});

// End time working
const SITE_EVENTBRITE = new SelectorSite({
  id: "eventbrite.com",
  domain_name: /www\.eventbrite\.(com|com\.au|sg)$/,
  event_title: ".event-title",
  venue_name: ".location-info__address-text",
  description: "#event-description",
  date_start: "[property='event:start_time']",
  date_end: "[property='event:end_time']",
  date_start_attr: "content",
  date_end_attr: "content",
})

// End time available in schema.org application/ld+json in head
const SITE_MEETUP = new SelectorSite({
  id: "meetup.com",
  domain_name: /www.meetup.com$/,
  schema_org: true,
  event_title: "main h1",
  venue_name: "[data-event-label='event-location']",
  description: "#event-details",
  date_start: "#event-info time",
  date_start_attr: "datetime",
});

// End time available in schema.org application/ld+json in head
const SITE_TRYBOOKING = new SelectorSite({
  id: "trybooking.com",
  domain_name: /www\.trybooking\.com$/,
  schema_org: true,
  event_title: ".event-name",
  venue_name: "[data-event-label='event-location']",
  description: "#default-eventname",
  date_start: "span[data-tb-session]",
  date_start_attr: "data-tb-session",
});

// End time available in schema.org application/ld+json in head
const SITE_LUMA = new SelectorSite({
  id: "lu.ma",
  domain_name: /lu\.ma$/,
  schema_org: true,
  event_title: ".title",
  venue_name: ".tito-venues span",
  description: ".tito-description",
  date_start: "#tito-basic-info a",
  date_start_attr: "",
});

// Example: "8pm, October 18th–9pm, October 21st, 2024"
// passing start time of 8pm.
// State date and end datetime missing.
// has link to .ical, that has all the data
const SITE_TITO = new SelectorSite({
  id: "ti.to",
  domain_name: /ti\.to$/,
  event_title: ".event-title",
  venue_name: ".content-card .fw-medium",
  description: ".tito-description",
  date_start: "#tito-basic-info a",
  date_start_attr: "",
});

const SITE_FACEBOOK = new FacebookSite();

const SITES = [SITE_EVENTBRITE, SITE_FACEBOOK, SITE_HUMANITIX, SITE_LUMA, SITE_MEETUP, SITE_TITO, SITE_TRYBOOKING]

export { SITES, SITE_EVENTBRITE, SITE_FACEBOOK, SITE_HUMANITIX, SITE_LUMA, SITE_MEETUP, SITE_TITO, SITE_TRYBOOKING }