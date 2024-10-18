

  "browser_action": {
    "default_popup": "popup/popup.html",
    "default_icon": "icons/icon48.png"
  },


{
  "manifest_version": 2,
  "name": "Koalagato Events Addon",
  "version": "1.0",
  "description": "A simple browser extension",
  "icons": {
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "browser_action": {
    "default_icon": "icons/icon48.png"
  },
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "permissions": [
    "activeTab",
    "tabs"
  ]
}

, lastFocusedWindow: true