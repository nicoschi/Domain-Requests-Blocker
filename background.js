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
      const domainRegExp = new RegExp(option.domain);

      if(domainRegExp.test(documentUrl)) {
        console.log("domain " + option.domain);

        const assets = option.assets;

        assets.forEach((asset) => {
          const assetRegExp = new RegExp(asset);

          if(assetRegExp.test(url)) {
            console.log("asset: " + asset);
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
