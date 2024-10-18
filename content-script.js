const humanitix = {
    domain_name: "events.humanitix.com",
    event_title: "[data-testid='title']",
    venue_name: ".detail.location .f-label-3",
    date_start: ".detail.datetime time",
    date_start_attr: 'datetime'
  }
const eventbrite = {
    domain_name: "www.eventbrite.com",
    event_title: ".event-title",
    venue_name: ".location-info__address-text",
    date_start: "[property='event:start_time']",
    date_start_attr: 'content'
  }

//   <meta property="event:start_time" content="2024-11-19T18:00:00+13:00">

  const sites = [humanitix, eventbrite];
  const site = sites.find((s) => s.domain_name === location.hostname.toLowerCase());

  if(site){
    const eventTitle = document.querySelector(site.event_title)?.innerText;
    const venueName = document.querySelector(site.venue_name)?.innerText;

    let dateStart = document.querySelector(site.date_start)
    console.log({dateStart})
    if(site.date_start_attr) {
        dateStart = dateStart?.getAttribute(site.date_start_attr);
    }else{
        dateStart = dateStart?.innerText
    }
    const message = {eventTitle,venueName,dateStart};
//   alert(eventTitle);
    chrome.runtime.sendMessage(message);
}