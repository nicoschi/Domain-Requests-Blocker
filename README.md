# Request blocker per domain

This Firefox Add-on allows you to selectively block requests sent by web pages based on the url in the browser address bar. 

If you want to block requests regardless the url in the browser address bar you can do it but probably this isn't the right add-on for you. Maybe you can use something like [Request Blocker](https://addons.mozilla.org/it/firefox/addon/request-blocker-we/?src=search).

## Settings

To achieve the result open the add-on **preferences** and insert a **json array of objects**. Each object must have two mandatory properties: `addressBarUrlPattern` and `requestsToBlockPatterns`. 

The `addressBarUrlPattern` property will contain the regular expression pattern against which the address bar url will be tested before blocking requests listed in the `requestsToBlockPatterns`.
 
The `requestsToBlockPatterns` property will be an array of regular expressions patterns against which the requests to block will be tested before blocking. 

You can't provide regular expressions patterns with flags. If you need to escape special chars used in regular expression (for example dots inside url) use a double backslash '\\\\' because the pattern is inside a json which uses backslashes escape too as regex. 

### Examples

```json
[
  {
    "addressBarUrlPattern": "example\\.com",
    "requestsToBlockPatterns": [
      "request1.com",
      "request2.com"
    ]
  }
]
```
with this setting when visiting any web page which contains 'example.com' inside its url the requests to any resource containing 'request1.com' or 'request2.com' will be blocked. 
