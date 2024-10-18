const humanitix = {
    domain_name: "events.humanitix.com",
    event_title: "[data-testid='title']",
    venue_name: ".detail.location .f-label-3",
    date_start: ".detail.datetime time"
  }
const eventbrite = {
    domain_name: "www.eventbrite.com",
    event_title: ".event-title",
    venue_name: ".location-info__address-text",
    date_start: ".event-details__main-inner"
  }
  const sites = [humanitix, eventbrite];
  const site = sites.find((s) => s.domain_name === location.hostname.toLowerCase());

  if(site){
    const eventTitle = document.querySelector(site.event_title)?.innerText;
    const venueName = document.querySelector(site.venue_name)?.innerText;
    const dateStart = document.querySelector(site.date_start)?.innerText;
    const message = {eventTitle,venueName,dateStart};
//   alert(eventTitle);
    chrome.runtime.sendMessage(message);
}