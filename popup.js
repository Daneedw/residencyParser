
let downloadBtn = document.getElementById('runExtraction');
downloadBtn.onclick = function () {
  chrome.storage.local.get(["programs"], function (result) {
  
  console.log(result)
  console.log("right click object, copy, and then paste results into:");
  console.log("https://www.convertcsv.com/json-to-csv.htm")
  }
  )
  // download(`${now.getMonth() + 1}.${now.getDay()}.${now.getFullYear()}.txt`, str);

}




function getLocalChromeData(sKey) {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get(sKey, function (items) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(items[sKey]);
      }
    });
  });
}




function test(element) {
  console.log(element.attributes.data - item);

}
function download(filename, text) {
  var pom = document.createElement('a'); 
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else {
    pom.click();
  }
}

