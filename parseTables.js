
///program information:



const programInfoDiv = document.querySelector(".demo-section.k-content.export-app.wide");
const website = programInfoDiv.querySelectorAll("label")[1].nextElementSibling.textContent;
let programPhoneNumber = programInfoDiv.querySelectorAll("label")[0].nextElementSibling.textContent;
let programEmail = programInfoDiv.querySelectorAll("label")[4].nextElementSibling.textContent;
let region = programInfoDiv.querySelectorAll("label")[5].nextElementSibling.textContent;
let programDirector = programInfoDiv.querySelectorAll("label")[7].nextElementSibling.textContent;
let programCoordinator = programInfoDiv.querySelectorAll("label")[8].nextElementSibling.textContent;
let programCoordinatorPhone = programInfoDiv.querySelectorAll("label")[9].nextElementSibling.textContent;


let tables = [...document.querySelectorAll("table")];
let scoreRequirementsTable = findTableWithText("Step 1 Required for Interview Consideration");
let minimumStep1ForInterview = scoreRequirementsTable.querySelectorAll("tr")[3];
let minimumStep2ForInterview = scoreRequirementsTable.querySelectorAll("tr")[6];
let scoreRequirements = getSingleAnswerData(scoreRequirementsTable);

let practiceEnvironmentTable =findTableWithText("Average hours per week in Year 1 that residents work");
let practiceEnvironment = getSingleAnswerData(practiceEnvironmentTable);

let educationAndResearchEnvironmentTable = findTableWithText("Dedicated research rotation")
let educationAndResearchEnvironment = getSingleAnswerData(educationAndResearchEnvironmentTable);

let educationalBenefitsTable = findTableWithText("Integrative medicine curriculum")
let educationalBenefits =  getSingleAnswerData(educationalBenefitsTable);


let specialTracksTable = findTableWithText("Non-accredited research track/fellowship")
let specialTracks =  getSingleAnswerData(specialTracksTable);


let programEmploymentBenefitsTable = findTableWithText("Part-time/shared schedule positions");
let programEmploymentBenefits =  getSingleAnswerData(programEmploymentBenefitsTable);


let residentSalaryAndLeaveTable = findTableWithText("# of Paid Sick Days");
let residentSalaryAndLeave = getMultiAnswerData(residentSalaryAndLeaveTable);

let otherIMPORTANTInformationTable = findTableWithText("# of required letters of recommendation");
let otherIMPORTANTInformation = getSingleAnswerData(otherIMPORTANTInformationTable);






function findTableWithText(text){
   return tables.filter(table => table.innerHTML.includes(text))[0]
}
function getSingleAnswerData(table){

    return [...table.querySelectorAll("tr")].map(row => ({question:row.querySelector("th")?.textContent,
                                                            answer:row.querySelector("td")?.textContent.trim()}))
}

function getSalaryAndLeaveData(table){

    return [...table.querySelectorAll("tr")].map(row => ({year:row.querySelector("th")?.textContent,
                                                            Salary:row.querySelector("td")?.textContent.trim(),
                                                            paidSickDays:row.querySelector("td+td")?.textContent.trim(),
                                                            paidVacationDays:row.querySelector("td+td+td")?.textContent.trim(),

                                                        }))
}





