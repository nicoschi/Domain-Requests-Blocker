# Request blocker per domain

This Firefox Add-on allows you to selectively block requests sent by web pages based on the url in the browser address bar. 

If you want to block requests regardless the url in the browser address bar you can do it but probably this isn't the right add-on for you. Maybe you can use something like [Request Blocker](https://addons.mozilla.org/it/firefox/addon/request-blocker-we/?src=search).

## Installation

1. Open the [releases page](https://github.com/nicoschi/domain-requests-blocker/releases)
2. Click on the newer one release
3. Click on domain_requests_blocker-x.x.x-an+fx.xpi
4. Add the web extension to Firefox 

## Settings

To achieve the result open the add-on **preferences** and insert a **json array of objects**. Each object must have two mandatory properties: `addressBarUrlPattern` and `requestsToBlockPatterns`. 

The `addressBarUrlPattern` property will contain the regular expression pattern against which the address bar url will be tested before blocking requests listed in the `requestsToBlockPatterns`.
 
The `requestsToBlockPatterns` property will be an array of regular expressions patterns against which the requests to block will be tested before blocking. 

You can't provide regular expressions patterns with flags. If you need to escape special chars used in regular expression (for example dots inside url) use a double backslash '\\\\' because the pattern is inside a json which uses backslashes escape too as regex. 

### Examples

#### No. 1 
```json
[
  {
    "addressBarUrlPattern": "example\\.com",
    "requestsToBlockPatterns": [
      "request1\\.com",
      "request2\\.com"
    ]
  }
]
```

with this setting when visiting any web page which contains 'example.com' inside its url the requests to any resource containing 'request1.com' or 'request2.com' coming from the web page will be blocked. 

#### No. 2

```json
[
  {
    "addressBarUrlPattern": "^https://example\\.com$",
    "requestsToBlockPatterns": [
      "request1\\.com",
      "request2\\.com"
    ]
  }
]
```

same as No. 1 but the url of the web page must be exactly `https://example.com`.

#### No. 3

```json
[
  {
    "addressBarUrlPattern": "^https://example\\.com$",
    "requestsToBlockPatterns": [
      "request1\\.com$",
      "request2\\.com$"
    ]
  }
]
```

same as No. 2 but only requests exactly ending with `request1.com` or `request2.com` will be blocked. 

#### No. 4

```json
[
  {
    "addressBarUrlPattern": "^https://example\\.com$",
    "requestsToBlockPatterns": [
      "\\.css$",
      "\\.jpg$"
    ]
  }
]
```

blocking requests of jpg images and css resources. 
