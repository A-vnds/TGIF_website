const members = data.results[0].members
const partySelector = document.getElementById("selectParty");
const stateSelector = document.getElementById('selectState');

let tableResults = document.getElementById('senate_table');

const checkDem = document.getElementById('checkDem');
const checkRep = document.getElementById('checkRep');
const checkInd = document.getElementById('checkInd');

createTable(members);

partySelector.addEventListener("change", zeroMatches);
stateSelector.addEventListener("change", zeroMatches);



// Create Main Table Function

function createTable(data) {
    let html = "<table border='1|1'>";

    for (let i = 0; i < data.length; i++) {
        if (data[i].middle_name != null) {
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

// Filter Array based on State and Party 

function filterArray() {

    let filteredArray = [];

    for (let i = 0; i < members.length; i++) {

        if (members[i].state == stateSelector.value || stateSelector.value == 'All') {

            if ((members[i].party == 'D') && (checkDem.checked == true)) {
                filteredArray.push(members[i]);
            } else if ((members[i].party == 'R') && (checkRep.checked == true)) {
                filteredArray.push(members[i]);
            } else if ((members[i].party == 'I') && (checkInd.checked == true)) {
                filteredArray.push(members[i]);
            }

        }
    }
    createTable(filteredArray);
}

// Reset Function based on different cases

function caseReset() {
    if ((stateSelector.value == 'All' && (checkDem.checked == false) && (checkRep.checked == false) && (checkInd.checked == false))) {
        resetTableArr();
    } else {
        filterArray();
    }
    }

// General Reset Function of the Table

function resetTableArr() {

    stateSelector.value = 'All'
    checkDem.checked = true;
    checkRep.checked = true;
    checkInd.checked = true;
    filterArray();
}

// Message Function for Zero Matches, the main function called on the Event Listener at the Top

function zeroMatches() {
    
    filterArray();
    
    if (!tableResults.hasChildNodes()) {
        alert("There are no matches for this values, the table will be reset");
        resetTableArr();
    }}
    
 