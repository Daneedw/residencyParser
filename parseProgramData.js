var attempts = 20;

console.log("test!")
let tables = [...document.querySelectorAll("table")];

attemptRunScript();

async function attemptRunScript() {

   
        try {
            await extractData()

        } catch (error) {
            console.log(error)
            attempts--;

        }



}


async function storeChrome(storageKey, passedInArr) {
    console.log(passedInArr);
    await chrome.storage.local.get([storageKey], function (result) {
        var array = result[storageKey] ? result[storageKey] : [];
        newArry = [array, passedInArr];
        let finalArray = [].concat(...newArry);
        var jsonObj = {};
        jsonObj[storageKey] = finalArray;
        chrome.storage.local.set(jsonObj, function () {
            console.log("Saved a new array item");

            console.log(jsonObj)
            // window.open('', '_self').close()
        });
    });
}



async function extractData() {


    ///program information:



    const programInfoDiv = document.querySelector(".demo-section.k-content.export-app.wide");
    const website = programInfoDiv.querySelectorAll("label")[1].nextElementSibling.textContent;
    let programName = document.querySelector(".program-detail-name").textContent
    let programPhoneNumber = programInfoDiv.querySelectorAll("label")[0].nextElementSibling.textContent;
    let programEmail = programInfoDiv.querySelectorAll("label")[4].nextElementSibling.textContent;
    let region = programInfoDiv.querySelectorAll("label")[5].nextElementSibling.textContent;
    let programDirector = programInfoDiv.querySelectorAll("label")[7].nextElementSibling.textContent;
    let programCoordinator = programInfoDiv.querySelectorAll("label")[8].nextElementSibling.textContent;
    let programCoordinatorPhone = programInfoDiv.querySelectorAll("label")[9].nextElementSibling.textContent;

    console.log(programCoordinatorPhone);

    let scoreRequirementsTable = findTableWithText("Step 1 Required for Interview Consideration");
    let minimumStep1ForInterview = scoreRequirementsTable.querySelectorAll("tr")[3];
    let minimumStep2ForInterview = scoreRequirementsTable.querySelectorAll("tr")[6];
    let scoreRequirements = getSingleAnswerData(scoreRequirementsTable);
    console.log(scoreRequirements);
    let practiceEnvironmentTable = findTableWithText("Average hours per week in Year 1 that residents work");
    let practiceEnvironment = getSingleAnswerData(practiceEnvironmentTable);
console.log(practiceEnvironment);
    let educationAndResearchEnvironmentTable = findTableWithText("Dedicated research rotation")
    let educationAndResearchEnvironment = getSingleAnswerData(educationAndResearchEnvironmentTable);

    let educationalBenefitsTable = findTableWithText("Integrative medicine curriculum")
    let educationalBenefits = getSingleAnswerData(educationalBenefitsTable);


    let specialTracksTable = findTableWithText("Non-accredited research track/fellowship")
    let specialTracks = getSingleAnswerData(specialTracksTable);


    let programEmploymentBenefitsTable = findTableWithText("Part-time/shared schedule positions");
    let programEmploymentBenefits = getSingleAnswerData(programEmploymentBenefitsTable);


    let residentSalaryAndLeaveTable = findTableWithText("# of Paid Sick Days");
    let residentSalaryAndLeave = getSalaryAndLeaveData(residentSalaryAndLeaveTable);

    let otherIMPORTANTInformationTable = findTableWithText("# of required letters of recommendation");
    let otherIMPORTANTInformation = getSingleAnswerData(otherIMPORTANTInformationTable);

    let obj = {
        programName,
        website, programPhoneNumber, programEmail, region, programDirector, programCoordinator, programCoordinatorPhone
    ,   minimumStep1ForInterview, minimumStep2ForInterview, scoreRequirements
    ,   practiceEnvironment, educationAndResearchEnvironment, educationalBenefits, specialTracks
    , programEmploymentBenefits, residentSalaryAndLeave,
    otherIMPORTANTInformation 
    };
    console.log(obj)
    await storeChrome("parsedProgram", obj);

}


function findTableWithText(text) {
    return tables.filter(table => table.innerHTML.includes(text))[0]
}

function getSingleAnswerData(table) {

    return [...table.querySelectorAll("tr")].map(row => ({
        _question: row.querySelector("th")?.textContent,
        answer: row.querySelector("td")?.textContent.trim()
    }))
}

function getSalaryAndLeaveData(table) {

    return [...table.querySelectorAll("tr")].map(row => ({
        year: row.querySelector("th")?.textContent,
        Salary: row.querySelector("td")?.textContent.trim(),
        paidSickDays: row.querySelector("td+td")?.textContent.trim(),
        paidVacationDays: row.querySelector("td+td+td")?.textContent.trim(),

    }))
}
