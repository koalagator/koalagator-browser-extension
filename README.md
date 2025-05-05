# Koalagator Browser Extension

This browser extension makes it easy to add events from supported event sites.
Suppported events sites have mapping files in /mappings.

(Version 1 currently only submits to one instance of koalagator)

![SCR-20250505-unqz](https://github.com/user-attachments/assets/23706983-0989-43cd-9115-00f0e71bc57a)

One click and a create event page is opened in a new tab, filled out with all the event details. 

![SCR-20250505-uqle](https://github.com/user-attachments/assets/318ecf45-0728-4f1c-918b-505dd831cdf0)

You're then able to review and edit before saving the event.

## Supported event sites

We aim to support all major event website used by community organisers.
(Concert and major sporting events ticketing are not the focus of this extension)

Supported: Humanitix, Eventbrite, Meetup, Trybooking, Tito, Luma
Coming soon: Facebook

To add additional sites or to fix a data collection field, make changes in content-script.js

Here's an example of how humanitix is processed. Note: We also process the date based on schema.org if this json is present

    // example from content-script.js
    const humanitix = {
        domain_name: "events.humanitix.com",
        event_title: "[data-testid='title']",
        venue_name: ".detail.location .f-label-3",
        description: ".EventDescription .RichContent",![Uploading SCR-20250505-unqz.png…]()

        date_start: ".detail.datetime time",
        date_start_attr: 'datetime'
    }

## Install in your browser

1. Click the .xpi file in your fav browser and follow the prompts

   https://github.com/koalagator/koalagator-browser-extension/releases

## Using the extension

1. Firefox: Click the 'puzzle' icon and find the extension and the pin it, so it shows in your toolbar.

2. Visit an event on a supported site (eg humanitix) and wait until the koalagator icon turns green (signifiying its ready).

3. Click Koalagator icon, it'll open to a new event page on a koalagator instance, review data and click create to save the event.

## Development on the extension

We recommend you install [web-ext](https://github.com/mozilla/web-ext) locally.
It supports live reloading of your plugin as you change the code.

  brew install web-ext

  web-ext run # spins up a firefox instance with your extension live loaded

## Deploying a build

1. Update 'version' in manifest.json
2. Sign the extension (see below)
3. In github create a new release and attach the .xpi file from signing.
https://github.com/koalagator/koalagator-browser-extension/releases/new

## Signing For Firefox

```
web-ext sign --channel=unlisted --amo-metadata=./web-ext.json --api-key=user:18647829:320 --api-secret=$AMO_JWT_SECRET
```

## Contribute

We welcome Pull requests, if the data reading stops working correctly, feel free to review the css selectors used here and to make a PR to fix it for everyone. 

Confused or new to development, reach out, we're friendly :)

## Licence

This project is licensed as LGPL3.0, see LICENSE.md

## Notes on the Browser Icon

Three states:

Unavailable/Inactive (domain not supported)
Support site (loading)
Supported site (Ready)

Inactive - Greyed out
Loading - Green dots
Ready - Green


When first visit a page
Checks the domain
Not on white list - Inactive
On whitelist - Loading
Once loaded.. Ready

### How to test locally

#### Test on Firefox

Use web-ext as above.

#### Test on Chrome

Menu 'Window' > Extensions
'Load Unpacked' and select project folder.

(This needs to be repeated every time the code changes, to reload)
