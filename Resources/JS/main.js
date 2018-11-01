const members = data.results[0].members


const partySelector = document.getElementById("selectParty");

const stateSelector = document.getElementById('selectState');


const checkDem = document.getElementById('checkDem');
const checkRep = document.getElementById('checkRep');
const checkInd = document.getElementById('checkInd');

console.log(partySelector);
console.log(stateSelector);
console.log(checkDem);





createTable(members);
partySelector.addEventListener("change", filterArray);
stateSelector.addEventListener("change", filterArray);






// Create Table Function

console.log(data)
function createTable(data) {
    let html = "<table border='1|1'>";

    for (let i = 0; i < data.length; i++) {
        if (data[i].middle_name !=  null)
        {
        html += "<tr>";
        html += "<td>" + (data[i].first_name + ' ' + data[i].middle_name + ' ' + data[i].last_name).link(data[i].url) + "</td>";
        html += "<td>" + data[i].party + "</td>";
        html += "<td>" + data[i].state + "</td>";
        html += "<td>" + data[i].seniority + "</td>";
        html += "<td>" + data[i].votes_with_party_pct + "</td>";
        html += "</tr>"; 
        } else 
        html += "<tr>";
        html += "<td>" + (data[i].first_name + ' ' + data[i].last_name).link(data[i].url) + "</td>";
        html += "<td>" + data[i].party + "</td>";
        html += "<td>" + data[i].state + "</td>";
        html += "<td>" + data[i].seniority + "</td>";
        html += "<td>" + data[i].votes_with_party_pct + '%' + "</td>";
        html += "</tr>";
    }
    
    html += "</tbody>";
    document.getElementById("senate_table").innerHTML = html;
    

}

createTable(members);



// Filter Array based on Gender

function filterArray2() {

    let filteredArray = [];
    
    for (let i = 0; i < members.length; i++) {
        
        if (members[i].party == partySelector.value || partySelector.value == 'All') 
        
        
        {
            if (members[i].state == stateSelector.value || stateSelector.value == 'All'){
                filteredArray.push(members[i]); }
            }
        }
    createTable(filteredArray);
}


function filterArray() {

    let filteredArray = [];
    
    for (let i = 0; i < members.length; i++) {
        
        if (members[i].state == stateSelector.value || stateSelector.value == 'All') {
            
            if ((members[i].party == 'D') && (checkDem.checked == true))  {
                filteredArray.push(members[i]);} 
            else if ((members[i].party == 'R') && (checkRep.checked == true)) {
                filteredArray.push(members[i]);}
            else if (members[i].party == 'I') && (checkInd.checked == true) {
                filteredArray.push(members[i]);}
            }
        }
    createTable(filteredArray);
}

 
        
/*

function filterArray() {

    let filteredArray = [];
    
    for (let i = 0; i < data.length; i++) {
        if (members[i].gender == genderSelector.value || genderSelector.value == 'All') {
            if (ageSelector.value == "older" && data[i].age >= 30 ) {
                filteredArray.push(data[i]);
            } else if (ageSelector.value == "younger" && data[i].age < 30) {
                filteredArray.push(data[i]);
            } else if (ageSelector.value == 'All') {
                filteredArray.push(data[i]);
            }
        }
    }
    createTable(filteredArray);
}







*/





