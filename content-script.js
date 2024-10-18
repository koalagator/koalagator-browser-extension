const instanceUrl = "https://seedbomb.au/events/new";
const humanitix = {
    event_title: "[data-testid='title']",
    venue_name: ".detail.location .f-label-3",
    date_start: ".detail.datetime time"
  }
  const targetUrl = instanceUrl;
  const sites = [humanitix];
  
  const eventTitle = document.querySelector(humanitix.event_title).innerText;
  const venueName = document.querySelector(humanitix.venue_name).innerText;
  const dateStart = document.querySelector(humanitix.date_start).innerText;

  const message = {eventTitle,venueName,dateStart};
//   alert(eventTitle);

chrome.runtime.sendMessage(message);