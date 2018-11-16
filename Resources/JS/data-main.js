//const members = data.results[0].members
//console.log(data);

//const senateURL = "https://api.propublica.org/congress/v1/113/senate/members.json";
//const houseURL = "https://api.propublica.org/congress/v1/113/house/members.json";

//const partySelector = document.getElementById("selectParty");
//const stateSelector = document.getElementById('selectState');

//let tableResults = document.getElementById('senate_table');

//const checkDem = document.getElementById('checkDem');
//const checkRep = document.getElementById('checkRep');
//const checkInd = document.getElementById('checkInd');


//function getDATA(url) {
//    fetch(url, {
//            method: "GET",
//            headers: {
//                'X-API-Key': "9CWN1qilUH6MJzIghGk8igvIm0rNFPnIIs3wzi4Y",
//            }
//        })
//        .then(response => response.json()) // parses response to JSON
//        .then(json => {
//            data = json;
//            members = data.results[0].members;
//            app.senators = members;
//            //            createTable(members);
//            partySelector.addEventListener("change", app.zeroMatches);
//            stateSelector.addEventListener("change", app.zeroMatches);
//        })
//        .catch(error => error)
//}




//if (window.location.pathname == "/Resources/HTML/senate-data.html") {
//    getDATA(senateURL);
//};
//
//
//if (window.location.pathname == "/Resources/HTML/house-data.html") {
//    getDATA(houseURL);
//};



// Create Main Table Function

//function createTable(data) {
//    let html = "<table border='1|1'>";
//
//    for (let i = 0; i < data.length; i++) {
//        if (data[i].middle_name != null) {
//            html += "<tr>";
//            html += "<td>" + (data[i].first_name + ' ' + data[i].middle_name + ' ' + data[i].last_name).link(data[i].url) + "</td>";
//            html += "<td>" + data[i].party + "</td>";
//            html += "<td>" + data[i].state + "</td>";
//            html += "<td>" + data[i].seniority + "</td>";
//            html += "<td>" + data[i].votes_with_party_pct + "</td>";
//            html += "</tr>";
//        } else
//            html += "<tr>";
//        html += "<td>" + (data[i].first_name + ' ' + data[i].last_name).link(data[i].url) + "</td>";
//        html += "<td>" + data[i].party + "</td>";
//        html += "<td>" + data[i].state + "</td>";
//        html += "<td>" + data[i].seniority + "</td>";
//        html += "<td>" + data[i].votes_with_party_pct + '%' + "</td>";
//        html += "</tr>";
//    }
//
//    html += "</tbody>";
//    document.getElementById("senate_table").innerHTML = html;
//
//
//}

// Filter Array based on State and Party 

//function filterArray() {
//
//    let filteredArray = [];
//
//    for (let i = 0; i < members.length; i++) {
//
//        if (members[i].state == stateSelector.value || stateSelector.value == 'All') {
//
//            if ((members[i].party == 'D') && (checkDem.checked == true)) {
//                filteredArray.push(members[i]);
//            } else if ((members[i].party == 'R') && (checkRep.checked == true)) {
//                filteredArray.push(members[i]);
//            } else if ((members[i].party == 'I') && (checkInd.checked == true)) {
//                filteredArray.push(members[i]);
//            }
//
//        }
//    }
//    app.senators = filteredArray;
////    createTable(filteredArray);
//}

// Reset Function based on different cases

//function caseReset() {
//    if ((stateSelector.value == 'All' && (checkDem.checked == false) && (checkRep.checked == false) && (checkInd.checked == false))) {
//        resetTableArr();
//    } else {
//        filterArray();
//    }
//}

// General Reset Function of the Table

//function resetTableArr() {
//
//    stateSelector.value = 'All'
//    checkDem.checked = true;
//    checkRep.checked = true;
//    checkInd.checked = true;
//    filterArray();
//}

// Message Function for Zero Matches, the main function called on the Event Listener at the Top

//function zeroMatches() {
//
//    filterArray();
//
//    if (!tableResults.hasChildNodes()) {
//        alert("There are no matches for this values, the table will be reset");
//        resetTableArr();
//    }
//}



var app = new Vue({
    el: '#vue-app',
    data: {
        senators: [],
        members: [],
        senateURL: "https://api.propublica.org/congress/v1/113/senate/members.json",
        houseURL: "https://api.propublica.org/congress/v1/113/house/members.json",
        states: [],


        //        partySelector: document.getElementById("selectParty"),
        //        stateSelector: document.getElementById("selectState"),
        //        tableResults: document.getElementById('senate_table'),
        //        checkDem: document.getElementById('checkDem'),
        //        checkRep: document.getElementById('checkRep'),
        //        checkInd: document.getElementById('checkInd'),

    },
    created: function () {
        if (window.location.pathname == "/Resources/HTML/senate-data.html") {
            this.getData(this.senateURL);
        };
        if (window.location.pathname == "/Resources/HTML/house-data.html") {
            this.getData(this.houseURL);
        };
    },

    methods: {

        getData: function (url) {
            fetch(url, {
                    method: "GET",
                    headers: {
                        'X-API-Key': "9CWN1qilUH6MJzIghGk8igvIm0rNFPnIIs3wzi4Y",
                    }
                })
                .then(response => response.json()) // parses response to JSON
                .then(json => {
                    data = json;
                    this.members = data.results[0].members;
                    this.senators = data.results[0].members;
                    this.removeDuplicates();
                    //                        partySelector =  document.getElementById("selectParty");
                    //                        stateSelector =  document.getElementById("selectState");
                    //                        app.partySelector.addEventListener("change", this.zeroMatches);
                    //                        app.stateSelector.addEventListener("change", this.zeroMatches);
                })
                .catch(error => error)
        },



        removeDuplicates: function () {
            let stateListArray = [];

            for (let i = 0; i < this.members.length; i++) {
                if (stateListArray.indexOf(this.members[i].state) == -1) {
                    stateListArray.push(this.members[i].state);
                }
            }
            this.states = stateListArray;
        },


        zeroMatches: function () {
            this.filterArray();

            if (this.senators.length == 0) {
                alert("There are no matches for this values, the table will be reset");
                this.resetTableArr();
            }
        },

        resetTableArr: function () {

            checkDem = document.getElementById('checkDem');
            checkRep = document.getElementById('checkRep');
            checkInd = document.getElementById('checkInd');
            stateSelector = document.getElementById("selectState");

            stateSelector.value = 'All'
            checkDem.checked = true;
            checkRep.checked = true;
            checkInd.checked = true;
            this.filterArray();
        },

        caseReset: function () {

            checkDem = document.getElementById('checkDem');
            checkRep = document.getElementById('checkRep');
            checkInd = document.getElementById('checkInd');
            stateSelector = document.getElementById("selectState");


            if ((stateSelector.value == 'All' && (checkDem.checked == false) && (checkRep.checked == false) && (checkInd.checked == false))) {
                this.resetTableArr()
                console.log('hi');
            } else {
                this.filterArray();
            }
            console.log('hi');

        },


        filterArray: function () {

            checkDem = document.getElementById('checkDem');
            checkRep = document.getElementById('checkRep');
            checkInd = document.getElementById('checkInd');
            stateSelector = document.getElementById("selectState");


            let filteredArray = [];


            for (let i = 0; i < this.members.length; i++) {
            
                if (this.members[i].state == stateSelector.value || stateSelector.value == 'All') {

                    if ((this.members[i].party == 'D') && (checkDem.checked == true)) {
                        filteredArray.push(this.members[i]);
                    } else if ((this.members[i].party == 'R') && (checkRep.checked == true)) {
                        filteredArray.push(this.members[i]);
                    } else if ((this.members[i].party == 'I') && (checkInd.checked == true)) {
                        filteredArray.push(this.members[i]);
                    }
                }
            }
            this.senators = filteredArray;
        },
    }
});
