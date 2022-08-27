// need to run this on https://www.residencyexplorer.org/Explore
//to get all the programs that are checked (really just so we get the ids for later parsing)

JSON.stringify([...document.querySelectorAll("a[href*='GetById/']")].map(aTag => {
    if (aTag.parentElement.previousElementSibling.children[0].children[0].checked) {
        return ({ name: aTag.innerText, id: aTag.href.split("/")[aTag.href.split("/").length - 1] })
    }
})
    .filter(element => element !== undefined))