
 chrome.runtime.onInstalled.addListener(function() {
    // chrome.storage.sync.set({color: '#3aa757'}, function() {
    //   console.log('The color is green.');
    // });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'residencyexplorer.org'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });


  // chrome.runtime.onMessage.addListener(function(message, callback) {
  //   if (message.data == "setAlarm") {
  //     chrome.alarms.create({delayInMinutes: 5})
  //   } else if (message.data == "runLogic") {
  //     chrome.tabs.executeScript({file: 'logic.js'});
  //   } else if (message.data == "changeColor") {
  //     chrome.tabs.executeScript(
  //         {code: 'document.body.style.backgroundColor="orange"'});
  //   };
  // });

