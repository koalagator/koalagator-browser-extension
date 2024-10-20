
// Can't find end time
const humanitix = {
    domain_name: "events.humanitix.com",
    event_title: "[data-testid='title']",
    venue_name: ".detail.location .f-label-3",
    description: ".EventDescription .RichContent",
    date_start: ".detail.datetime time",
    date_start_attr: 'datetime'
  }

// End time working
const eventbrite = {
    domain_name: "www.eventbrite.com",
    event_title: ".event-title",
    venue_name: ".location-info__address-text",
    description: "#event-description",
    date_start: "[property='event:start_time']",
    date_end: "[property='event:end_time']",
    date_start_attr: 'content',
    date_end_attr: 'content'
  }

  // End time available in schema.org application/ld+json in head
const meetup = {
    domain_name: "www.meetup.com",
    event_title: "main h1",
    venue_name: "[data-event-label='event-location']",
    description: "#event-details",
    date_start: "#event-info time",
    date_start_attr: 'datetime'
}

  // End time available in schema.org application/ld+json in head
const trybooking = {
    domain_name: "www.trybooking.com",
    event_title: ".event-name",
    venue_name: "[data-event-label='event-location']",
    description: "#default-eventname",
    date_start: "span[data-tb-session]",
    date_start_attr: 'data-tb-session'
}


// Example: "8pm, October 18th–9pm, October 21st, 2024"
// passing start time of 8pm.
// State date and end datetime missing. 
// has link to .ical, that has all the data
const tito = {
    domain_name: "ti.to",
    event_title: ".event-title",
    venue_name: ".content-card .fw-medium",
    description: ".tito-description",
    date_start: "#tito-basic-info a",
    date_start_attr: ''
}

  // End time available in schema.org application/ld+json in head
const luma = {
    domain_name: "lu.ma",
    event_title: ".title",
    venue_name: ".tito-venues span",
    description: ".tito-description",
    date_start: "#tito-basic-info a",
    date_start_attr: ''
}

const sites = [humanitix, eventbrite, meetup, trybooking, tito, luma];

const check = () => {
    const site = sites.find((s) => s.domain_name === location.hostname.toLowerCase());
    if(site){
        const eventTitle = document.querySelector(site.event_title)?.innerText;
        const venueName = document.querySelector(site.venue_name)?.innerText;
        const description = document.querySelector(site.description)?.innerText;
        const website = `${location.origin}${location.href}`;
        let dateStart = document.querySelector(site.date_start);
        if(site.date_start_attr) {
            dateStart = dateStart?.getAttribute(site.date_start_attr);
        }else{
            dateStart = dateStart?.innerText
        }
        let dateEnd = document.querySelector(site.date_end);
        if(site.date_end_attr) {
            dateEnd = dateEnd?.getAttribute(site.date_end_attr);
        }else{
            dateEnd = dateEnd?.innerText;
        }
        const message = {eventTitle,venueName,dateStart,dateEnd,website,description,supported: true};
        chrome.runtime.sendMessage(message);
    } else {
        chrome.runtime.sendMessage({supported: false});
    }

}

check();
document.addEventListener("DOMContentLoaded",check);
chrome.runtime.onMessage.addListener ((request)=> {
    if(request.message==="runCheck") {
        check();
    }
})