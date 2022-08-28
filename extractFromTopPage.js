
chrome.storage.local.clear(function() {
  var error = chrome.runtime.lastError;
  if (error) {
      console.error(error);
  }
  slowOpen();
  // do something more
});


  async function slowOpen(){

      await new Promise(resolve => setTimeout(resolve, 30000)); 

      let programIdList =  [...document.querySelectorAll("a[href*='GetById/']")].map(aTag => {
        if (aTag.parentElement.previousElementSibling.children[0].children[0].checked) {
            return ({ name: aTag.innerText, id: aTag.href.split("/")[aTag.href.split("/").length - 1] })
        }
    }).filter(element => element !== undefined)

        var programs = programIdList.map((program) => {return{href: "https://www.residencyexplorer.org/Program/GetById/"+program.id,name:program.name }});
     
     
      chrome.storage.local.set({'links': programs}, function() {console.log("links set!")});
      
      // console.log(programs);
      // let firstThree = programs.filter((_, i) => i <=2)
      for (const program of programs) {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        window.open(program.href, '_blank'); 
        
      }
         
    }
