### 2.0.1

- Updated build instructions in README
- xpi file build actually works!

### 2.0.0

- Move to use extension.js, refactor codebase for ES6.
- Facebook events support working following the above change.

### 0.1.3

- Fix Humanitix Event URL is incorrectly duplicating the url

### 0.1.2

- Add initial support for Facebook events by reading ical files.

### 0.1.1

- Switching tabs, we collect and use the Tab ID to check state of current tab.
- Switching tabs, icon defaults back to inactive until allow list checker runs.
- Switching tabs, tab icon now shows correct state of that tab.

### 0.1.0

- Toolbar icon, shows gray for unsupported sites
- Toolebar icon shows as yellow while loading and green when ready.
- Todo: Toolbar not yet updating when you swap tabs, retains old loaded status.

### 0.0.5

- Fill the website (with params stripped off)
- Added autofill of event website and description

### 0.0.4

- Document loads to 'run-at', improved performance.
- Second event site supported, currently Hunitix & Eventbrite (basic details)
- Fields pre-filling into koalagator event form.
- Date/Time fields prefilling nicely into koalagator event form.

### 0.0.3

- Content script scrapes key fields
- Background.js listens for content-script messages
- background.js generates paramaterised url for submssion to koalgator instance

### 0.0.2

We can detect the domain of the users active tab.

### 0.0.1

Click browser icon and a koala url loads!
