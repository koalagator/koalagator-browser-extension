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

Supported: Humanitix, Eventbrite, Meetup, Trybooking, Tito, Luma and Facebook events.

## Install in your browser

Do these instructions in [Firefox](https://www.firefox.com) (currently the only supported browser).

1. Visit our releases page. The latest release will show first at the top of the page.

    https://github.com/koalagator/koalagator-browser-extension/releases

2. Scroll down until you get to the Asset section of the latest release.

<img width="485" height="236" alt="SCR-20250916-mklz" src="https://github.com/user-attachments/assets/4514c31b-92d7-467f-838d-c447ed6ca625" />

4. Click the .xpi file in Firefox and follow the prompts to install.

When it comes up tick to 'Pin to toolbar'. 

### What to do if you cant see the gray/green koalagator square icon in your firefox toolbar.

You can click the puzzle piece in the top left of the firefox header bar and then find the extension and press the cog icon and _then_ click 'Pin to Toolbar'.

You should now see a square icon in your task bar (with a crappy hard to see picture of a koala on it). It will be gray or green or have yellow lines through it if there's an error (in which case try hard refresh the page and then notify us if still stuck).
   
## How to use the extension

1. Visit an humanitix/facebook/eventbrite (etc) event and wait until the koalagator icon turns green (signifiying its ready).

3. Click (Green) Koalagator icon, it'll open to a new event page on a koalagator instance, review data and click create to save the event.

## Development on the extension

We recommend you use [web-ext](https://github.com/mozilla/web-ext) to test / develop locally.
It supports live reloading of your plugin as you change the code.

```
# Install dependencies:
npm install
```

Then start web-ext using:

```
npm run dev
```

## To add additonal event sites

To add additional sites or to fix a data collection field, make changes in content-script.js

Here's an example of how humanitix is processed. Note: We also process the date based on schema.org if this json is present.

    // example from content-script.js
    const humanitix = {
        domain_name: "events.humanitix.com",
        event_title: "[data-testid='title']",
        venue_name: ".detail.location .f-label-3",
        description: ".EventDescription .RichContent",![Uploading SCR-20250505-unqz.png…]()

        date_start: ".detail.datetime time",
        date_start_attr: 'datetime'
    }

## Deploying a build

1. Update 'version' in manifest.json
2. Sign the extension (see below)
3. In github create a new release and attach the .xpi file from signing.
   https://github.com/koalagator/koalagator-browser-extension/releases/new

## Signing For Firefox

    $ npm run build

    ```
    web-ext sign --channel=unlisted --amo-metadata=./web-ext.json --api-key=user:18647829:320 --api-secret=$AMO_JWT_SECRET
    ```

You can access our developer account via the Mozilla Ad-on developer hub (https://addons.mozilla.org/en-US/developers/)
Firefox Account: dev@koalagator.org (login details with evolve2k).

## Contribute

We welcome Pull requests, if the data reading stops working correctly, feel free to review the css selectors used here and to make a PR to fix it for everyone.

Confused or new to development, reach out, we're friendly :)

## Licence

This project is licensed as LGPL3.0, see LICENSE.md

## Notes on the Browser Icon

Three states:

### Extension States

| State    | Description                          | Browser Icon    |
| -------- | ------------------------------------ | --------------- |
| Inactive | Domain not supported                 | Greyed out      |
| Loading  | Support site detected (loading data) | Green with dots |
| Ready    | Supported site, fully loaded         | Green           |

### Behavior Flow When Visiting A Page

- Check current domain.
- If **not on whitelist** → set state to **Inactive**.
- If **on whitelist** → set state to **Loading**.
- Once all required data is loaded → set state to **Ready**.

### How to test locally

#### Test on Firefox

Use web-ext as above.

#### Test on Chrome

Menu 'Window' > Extensions
'Load Unpacked' and select project folder.

(This needs to be repeated every time the code changes, to reload)

## Dependencies

Uses the [kewisch/ical.js/](https://github.com/kewisch/ical.js/) library to parse ical files. Specifically,
[this build](https://unpkg.com/ical.js@2.1.0/dist/ical.es5.min.cjs).

**Note:**

This library is fairly fiddly to work with, and managing it as a dependency is quite awkward in Vanilla JS.
It was chosen mainly because it provides a transpiled ES5-compatible version of the library,
which is needed for our current project setup. To use a different more modern ES6 library, we will need to
bundle/transpile our code + dependencies into a deployable bundle.
One option is use [roll up with React + Vite](https://github.com/5tigerjelly/chrome-extension-react-template).
