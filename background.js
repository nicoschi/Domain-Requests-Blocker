const getOptionsObject = browser.storage.sync.get('optionsObject');

let optionsObject;

getOptionsObject.then((res) => {
  optionsObject = res['optionsObject'];
});

browser.storage.onChanged.addListener((changes, area) => {
  // todo: analizzare sync
  if(area === 'sync') {
    optionsObject = changes.optionsObject.newValue;
  }
})

browser.webRequest.onBeforeRequest.addListener(
  function(requestDetails) {
    const documentUrl = requestDetails.documentUrl;

    if(documentUrl === undefined) {
      return;
    }

    const url = requestDetails.url;

    let cancel = false;

    optionsObject.forEach((option) => {
      const addressBarUrlRegExp = new RegExp(option.addressBarUrlPattern);

      if(addressBarUrlRegExp.test(documentUrl)) {
        const requestsToBlockPatterns = option.requestsToBlockPatterns;

        requestsToBlockPatterns.forEach((requestToBlockPattern) => {
          const requestToBlockRegExp = new RegExp(requestToBlockPattern);

          if(requestToBlockRegExp.test(url)) {
            console.log("addressBarUrl " + option.addressBarUrlPattern);
            console.log("request to block: " + requestToBlockPattern);
            console.log("Canceling " + url + " request");
            console.log('----------');

            cancel = true;
          }
        });
      }
    });

    return {
      cancel: cancel
    }
  },
  {urls: ["<all_urls>"]},
  ['blocking']
);
