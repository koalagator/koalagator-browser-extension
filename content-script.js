const humanitix = {
    domain_name: "events.humanitix.com",
    event_title: "[data-testid='title']",
    venue_name: ".detail.location .f-label-3",
    description: ".EventDescription .RichContent",
    date_start: ".detail.datetime time",
    date_start_attr: 'datetime'
  }
const eventbrite = {
    domain_name: "www.eventbrite.com",
    event_title: ".event-title",
    venue_name: ".location-info__address-text",
    description: "#event-description",
    date_start: "[property='event:start_time']",
    date_start_attr: 'content'
  }

//   <meta property="event:start_time" content="2024-11-19T18:00:00+13:00">

const sites = [humanitix, eventbrite];

const check = () => {
    const site = sites.find((s) => s.domain_name === location.hostname.toLowerCase());
    if(site){
        const eventTitle = document.querySelector(site.event_title)?.innerText;
        const venueName = document.querySelector(site.venue_name)?.innerText;
        const description = document.querySelector(site.description)?.innerText;
        const website = `${location.origin}${location.href}`
        let dateStart = document.querySelector(site.date_start)
        console.log({dateStart})
        if(site.date_start_attr) {
            dateStart = dateStart?.getAttribute(site.date_start_attr);
        }else{
            dateStart = dateStart?.innerText
        }
        const message = {eventTitle,venueName,dateStart,website,description,supported: true};
        chrome.runtime.sendMessage(message);
    } else {
        chrome.runtime.sendMessage({supported: false});
    }

}

check();
document.addEventListener("DOMContentLoaded",check);