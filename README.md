# Koalagator Events (Browser) Addon 

This browser extension makes it easy to add events from supported event sites.
Suppported events sites have mapping files in /mappings.

# Browser Icon

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



# How to test locally

Open Firefox.

    about:debugging#/runtime/this-firefox

    > Load Temporary Addon
    > Select any file in the extensions directory
    > Remains intsalled until restart firefox

# Test on Chrome

Menu 'Window' > Extensions
'Load Unpacked' and select project folder.

(This needs to be repeated every time the code changes, to reload)


