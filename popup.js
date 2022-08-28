
let downloadBtn = document.getElementById('runExtraction');
downloadBtn.onclick = function () {
  var now = new Date();
  displayStats();
  // download(`${now.getMonth() + 1}.${now.getDay()}.${now.getFullYear()}.txt`, str);

}
let str = "";
let pubParsedPage;

removedChar = [];

//  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

//     chrome.tabs.executeScript( 
//         tabs[0].id,
//         {file: 'ankiPull.js'});
//   });
let main = document.getElementsByTagName("main")[0];
let txtInput = document.getElementById("tagInput");
let badges = document.getElementById("badges");
let allLinks;



getLocalChromeData(["links"]).then((links) => {
  allLinks = links;
  console.log(allLinks)
  displayStats();
});


chrome.storage.local.get(['currentTag'], function(result) {
console.log(result);
  if(result.currentTag != undefined && result.currentTag != null)
  {
    setTagSuccess(result);
  }
  else
  {
    
    document.querySelector("#currentTag").innerHTML = "None assigned";
    document.querySelector("#tagStatus").setAttribute("class", "text-danger");
  }


});

function setTagSuccess(result) {
  console.log(result);
  document.querySelector("#currentTag").innerHTML = result.currentTag;
  document.querySelector("#tagStatus").setAttribute("class", "text-success");
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



function displayStats() {

  chrome.storage.local.get(["parsedPage"], function ({ parsedPage: parsedPages }) {
    downloadBtn.disabled = false;
    console.log(parsedPages)
  //   pubParsedPage = parsedPages;

  //   //     allQuestions = allTopicsQuestions.map(topic => result.questions.filter(item => item.secondaryTag == topic));
  //   //     allFlashCards = allTopicsFlashCards.map(topic => result.flashCards.filter(item => item.secondaryTag == topic));

  //   var totalQuestions = 0;
  //   parsedPages.forEach(item => totalQuestions += item.questions.length);

  //   var totalFlashcards = 0;
  //   parsedPages.forEach(item => totalFlashcards += item.flashCards.length);



  //   parsedPages.forEach(item => item.secondaryTagSpaces = item.secondaryTag.replace(/_/g, " ").trim());
  //   console.log(allLinks);
  //   console.log(parsedPages);
  //   var mergedLinkAndPageData = mergeObjects(allLinks, parsedPages);

  //   var statuses = createCardFromSyncStatus(mergedLinkAndPageData);


  //   main.appendChild(addDiv(
  //     `<h4>Parsed Results</h4>
  //     <i>${totalQuestions} total questions </i>
  //     <i>${totalFlashcards} total flashcards</i>
  //       <br>
  //   ${statuses}
        
  //   </div>`));




  //   parsedPages.map((page, i) => document.createRange().createContextualFragment(` 
                   
  //   <h3> <i>${page.secondaryTag.replace(/_/g, " ")}</i></h3>
  //    <i>${page.questions.length} questions</i>
  //     ${page.questions.map(element => "<div class='card'><div class='card-body'><i>" + page.secondaryTag.replace(/_/g, " ") + "</i> <div class='card-title'>" + element.question + "</div> " + element.possibleAnswers.join("<br>").replace(/\*/g, "") + "</div> <div class='alert alert-success'>" + element.answer + "</div> </div></div>")}
  //     <h3> <i>${page.secondaryTag.replace(/_/g, " ")}</i></h3>
  //     <i>${page.flashCards.length} flashCards</i>
  //     ${page.flashCards.map(element => "<div class='card'><div class='card-body'> <div class='card-title'>" + element.question + "</div></div> <div class='alert alert-success'> " + element.answer + "</div>  </div>")}
    
  //  `)).forEach(item => main.appendChild(item));


  //   parsedPages.forEach((page) => formatQuestions(page.questions))
  //   parsedPages.forEach((page) => formatFlashcards(page.flashCards))



  //   str = str.replace(/’/g, "'");
  //   str = str.replace(/…/g, "...");
  //   str = str.replace(/—/g, "-");
  //   str = str.replace(/−/g, "-");
  //   str = str.replace(/α/g, "Alpha");
  //   str = str.replace(/π/g, "Pi");
  //   str = str.replace(/β/g, "Beta");
  //   str = str.replace(/“/g, "\"");
  //   str = str.replace(/”/g, "\"");
  //   str = str.replace(/κ/g, "Kappa");
  //   str = str.replace(/°/g, "'");

  //   str = checkCompatibility(str);
  //   //console.log(str)

  //   if (removedChar.length > 0)
  //     main.prepend(addDiv(`please remove: <br> ${removedChar}`, "alert alert-danger"))
  //   else
  //     main.prepend(addDiv(`Success!`, "alert alert-success"))


  }
  );

};



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

function statusesToCards(array) {
  var divOpen = false;
  var parsedList = "";
  array.forEach((page, i) => {

    if (i % 3 === 0) {
      if (!divOpen) {
        parsedList += '<div class="card-group">';
        divOpen = true;
      }

      else {
        parsedList += '</div>';

        if (i !== array.length - 1)
          parsedList += '<div class="card-group">';
      }
    }


    parsedList += createCardFromSyncStatus(page)

  }


  );

  if (divOpen) {
    parsedList += "</div>";
  }
  return parsedList
}

function createCardFromSyncStatus(syncData) {

  tempStr = "";
  syncData.forEach((page) => {
    tempStr += ` 
    <br>
    <i>${page.secondaryTagSpaces} </i>
    <br>
    <small> questions: ${page.questions.length}
     <br>
     flashcards: ${page.flashCards.length}
     </small>
     
  
  `


  }

  )
  return tempStr;

}

function mergeObjects(allLinks, parsedPages) {


  allLinks.forEach(link => {

    parsedPages.forEach(page => {

      if (link.href === page.href) {
        link.questions = page.questions;
        link.flashCards = page.flashCards;
        link.secondaryTag = link.secondaryTagSpaces.replace(/ /g, "_");
        link = { ...link, ...page };
      }

    })


  })
  return allLinks;
}

function addDiv(content, cssClass) {
  return document.createRange().createContextualFragment(`<div ${cssClass !== undefined ? "class='" + cssClass + "'" : ""}>${content}</div>`);

}
function card(content, cssClass) {


  return document.createRange().createContextualFragment(`
  <div class="card" style="width: 18rem;">
   
    <div class="card-body">
      <p class="card-text ${cssClass !== undefined ? cssClass : ""}">${content}</p>
  
    </div>
  </div>
  `)

}

function checkCompatibility(input) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
    else {
      output += "************";
      output += input.charAt(i);
      output += "************";
      removedChar.push(input.charAt(i));
    }

  }
  return output;
}


function formatFlashcards(flashCards) {

  for (let i = 0; i < flashCards.length; i++) {
    str += `${flashCards[i].question}\t${flashCards[i].answer}\t ${flashCards[i].tag} ${flashCards[i].secondaryTag}\n`;

  }

}
function formatQuestions(questionsObj) {

  for (let i = 0; i < questionsObj.length; i++) {

    str += "\n";


    str += `${questionsObj[i].question}<br>`;
    for (let j = 0; j < questionsObj[i].possibleAnswers.length; j++) {
      str += `${questionsObj[i].possibleAnswers[j].replace(/\*/g, "")} <br>`;
    }
    str += "\t";

    str += `${questionsObj[i].answer} <br>`;
    str += `\t${questionsObj[i].tag} ${questionsObj[i].secondaryTag}`;
  }
  str += "\n";
}





async function storeChrome(storageKey, passedInArr, callback) {
  await chrome.storage.local.get([storageKey], function (result) {
    var array = result[storageKey] ? result[storageKey] : [];
    newArry = [array, passedInArr];
    let finalArray = [].concat(...newArry);
    var jsonObj = {};
    jsonObj[storageKey] = finalArray;
    chrome.storage.local.set(jsonObj, callback);
  });
}


document.querySelector("#saveTag").addEventListener("click", function(event){

newTagValue = document.querySelector("#newTag").value;
chrome.storage.local.set({"currentTag": newTagValue}, function() {
  
  setTagSuccess({"currentTag": newTagValue})
});

})