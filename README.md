# Request blocker per domain

This Firefox Add-on allows you to selectively block requests sent by web pages based on the url in the browser address bar. 

If you want to block requests regardless the url in the browser address bar you can do it but probably this isn't the right add-on for you. Maybe you can use something like [Request Blocker](https://addons.mozilla.org/it/firefox/addon/request-blocker-we/?src=search).

## Settings

To achieve the result open the add-on **preferences** and insert a **json array of objects**. Each object must have two mandatory properties: `addressBarUrlPattern` and `requestsToBlockPatterns`. 
The `addressBarUrlPattern` property will contain the pattern against which the address bar url will be tested before blocking requests listed in the `requestsToBlockPatterns`. 
The `requestsToBlockPatterns` property will be and array of patterns against which the requests you want to block will be tested before blocking. 
