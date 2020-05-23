function saveOptions(e) {
  const options = document.querySelector("#options").value;
  const optionsObject = getOptionsObject(options);

  browser.storage.sync.set({
    options: options,
    optionsObject: optionsObject
  });

  e.preventDefault();
}

function getOptionsObject(options) {
  try {
    return JSON.parse(options);
  }
  catch(error) {
    alert(error);
    throw error;
  }
}

function restoreOptions() {
  const getOptions = browser.storage.sync.get('options');
  getOptions.then((res) => {
    document.querySelector("#options").value = res.options || '[]';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
