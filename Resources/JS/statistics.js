//const members = data.results[0].members;


const senateURL = "https://api.propublica.org/congress/v1/113/house/members.json";
const houseURL = "https://api.propublica.org/congress/v1/113/senate/members.json";




if ((window.location.pathname == "/Resources/HTML/senate-attendance.html") || (window.location.pathname == "/Resources/HTML/senate-loyalty.html")) {
    getDATA(senateURL);
};


if ((window.location.pathname == "/Resources/HTML/house-attendance.html") || (window.location.pathname == "/Resources/HTML/house-loyalty.html")) {
    getDATA(houseURL);
};




function getDATA(url) {
    fetch(url, {
            method: "GET",
            headers: {
                'X-API-Key': "9CWN1qilUH6MJzIghGk8igvIm0rNFPnIIs3wzi4Y",
            }
        })
        .then(response => response.json()) // parses response to JSON
        .then(data => {
        console.log()
            members = data.results[0].members;
            webLogic();
        })
        .catch(error => error)
}






function webLogic() {
    console.log(members)
    let demoLength = totalNumber('D');
    let repuLength = totalNumber('R');
    let indeLength = totalNumber('I');
    let totalNumberOfCand = demoLength + repuLength + indeLength;

    let demoMissedVotP = averMissedVotesPerc('D');
    let repuMissedVotP = averMissedVotesPerc('R');
    let indeMissedVotP = averMissedVotesPerc('I');
    let averMissedVotP = ((demoMissedVotP + repuMissedVotP + indeMissedVotP) / 3);

    demoMissedVotP = demoMissedVotP || 0;
    repuMissedVotP = repuMissedVotP || 0;
    indeMissedVotP = indeMissedVotP || 0;
    averMissedVotP = averMissedVotP || 0;

    let demoVotPerc = totalVotedPerc('D');
    let repuVotPerc = totalVotedPerc('R');
    let indeVotPerc = totalVotedPerc('I');

    let averPVDemo = demoVotPerc / demoLength;
    let averPVRepu = repuVotPerc / repuLength;
    let averPVInde = indeVotPerc / indeLength;
    let averAverPVP = ((averPVDemo + averPVRepu + averPVInde) / 3);



    // Convert any falsey values to 0; false, NaN, undefined, 0, " ", null.

    averPVDemo = averPVDemo || 0;
    averPVRepu = averPVRepu || 0;
    averPVInde = averPVInde || 0;
    averAverPVP = averAverPVP || 0;

    let leastEngaged = [...members].sort(function (a, b) {
        return parseFloat(b.missed_votes_pct) - parseFloat(a.missed_votes_pct);
    });

    let mostEngaged = [...members].sort(function (a, b) {
        return parseFloat(a.missed_votes_pct) - parseFloat(b.missed_votes_pct);
    });


    // Least Loyal: The ones with lowest 'Voted with Party' Percentage
    // Most Loyal: The ones with the highest 'Voted with Party' Percentage

    let leastLoyal = [...members].sort(function (a, b) {
        return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
    });


    let mostLoyal = [...members].sort(function (a, b) {
        return parseFloat(b.votes_with_party_pct) - parseFloat(a.votes_with_party_pct);
    });



    let leastEngagedArray = find10Percent(leastEngaged, "missed_votes_pct", "des");
    let mostEngagedArray = find10Percent(mostEngaged, "missed_votes_pct", "asc");

    let leastLoyalArray = find10Percent(leastLoyal, "votes_with_party_pct", "asc");
    let mostLoyalArray = find10Percent(mostLoyal, "votes_with_party_pct", "des");




    // Call Functions according to URL path so you don't have undefined iDs

    if (window.location.pathname == "/Resources/HTML/senate-loyalty.html" || window.location.pathname == "/Resources/HTML/house-loyalty.html") {
        createTable(leastLoyalArray, "senate_least_loyal", "total_votes", "votes_with_party_pct");
        createTable(mostLoyalArray, "senate_most_loyal", "total_votes", "votes_with_party_pct");
    }

    if (window.location.pathname == "/Resources/HTML/senate-attendance.html" || window.location.pathname == "/Resources/HTML/house-attendance.html") {

        createTable(leastEngagedArray, "senate_least_engaged", 'missed_votes', 'missed_votes_pct');
        createTable(mostEngagedArray, "senate_most_engaged", 'missed_votes', 'missed_votes_pct');
    }


    // Small Table and Rest of the Statistics

    var statistics = {
        'Number of Republicans': totalNumber('R'),
        'Average Republican Missed Votes Perc': demoMissedVotP,
        'Number of Democrats': totalNumber('D'),
        'Average Democratic Missed Votes Perc': repuMissedVotP,
        'Number of Independents': totalNumber('I'),
        'Average Inde Missed Votes Perc': indeMissedVotP,
        'Total Senate Number': totalNumberOfCand,
        'Aver of Aver Missed Votes Perc': averMissedVotP,
        'Average Republican Voted wParty Perc': averPVDemo,
        'Average Democratic Voted wParty Perc': averPVRepu,
        'Average Independent Voted wParty Perc': averPVInde,
        'Average of averages Voted wParty Perc': averAverPVP,
    }


    //Independent to URL 

    document.getElementById('total_Republicans').innerHTML = statistics["Number of Republicans"];
    document.getElementById('total_Democrats').innerHTML = statistics["Number of Democrats"];
    document.getElementById('total_Indepedents').innerHTML = statistics["Number of Independents"];
    document.getElementById('total_number_candidates').innerHTML = statistics["Total Senate Number"];

    //Attendance Table

    if ((window.location.pathname == "/Resources/HTML/senate-attendance.html" || window.location.pathname == "/Resources/HTML/house-attendance.html")) {
        document.getElementById('aver_rep_missedper').innerHTML = Math.floor(statistics['Average Republican Missed Votes Perc']) + "%";
        document.getElementById('aver_dem_missedper').innerHTML = Math.floor(statistics["Average Democratic Missed Votes Perc"]) + "%";
        document.getElementById('aver_ind_missedper').innerHTML = Math.floor(statistics["Average Inde Missed Votes Perc"]) + "%";
        document.getElementById('aver_of_aver_missedper').innerHTML = Math.floor(statistics["Aver of Aver Missed Votes Perc"]) + "%";
    }


    //Loyalty Table

    if ((window.location.pathname == "/Resources/HTML/senate-loyalty.html" || window.location.pathname == "/Resources/HTML/house-loyalty.html")) {
        document.getElementById('aver_rep_votWParty').innerHTML = Math.floor(statistics["Average Republican Voted wParty Perc"]) + "%";
        document.getElementById('aver_dem_votWParty').innerHTML = Math.floor(statistics["Average Democratic Voted wParty Perc"]) + "%";
        document.getElementById('aver_ind_votWParty').innerHTML = Math.floor(statistics["Average Independent Voted wParty Perc"]) + "%";
        document.getElementById('aver_of_aver_votWParty').innerHTML = Math.floor(statistics["Average of averages Voted wParty Perc"]) + "%";
    }

}


// Number of Candidates Function

function totalNumber(par) {
    let arr = [];
    let total = 0;
    for (let i = 0; i < members.length; i++) {
        if (members[i].party == par) {
            arr.push(members[i]);
        }
    }
    return total = arr.length;
}





// ATTENDANCE: Average Missed Votes Percentage

function averMissedVotesPerc(par) {
    let total = 0;
    let average = 0;

    for (let i = 0; i < members.length; i++) {
        if (members[i].party == par) {
            total += members[i].missed_votes_pct;
            average = (total / totalNumber(par));
        }
    }
    return average;
}




// Convert any falsey values to 0; false, NaN, undefined, 0, " ", null.





// LOYALTY: Total percentage voted for each party

function totalVotedPerc(par) {
    let total = 0;

    for (let i = 0; i < members.length; i++) {
        if (members[i].party == par) {
            total += members[i].votes_with_party_pct;
        }
    }
    return total;
}





// Least Engaged: The ones with the highest number of missed votes
// Most Engaged: The ones with the lowest number of missed votes
//function to calculate the 10% with three arguments: one array, one value and the order 

function find10Percent(arr, value, order) {
    let newArray = [];
    let newValue = (arr.length / 10);
    let newLength = newValue.toFixed(0);
    let comparator = arr[newLength][value];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][value] <= comparator && order == "asc") {
            newArray.push(arr[i]);
        }

        if (arr[i][value] >= comparator && order == "des") {
            newArray.push(arr[i]);
        }
    }
    return newArray;
}


//Create the arrays for each of the four tables
// Create Main Table Function

function createTable(data, tableId, keyOne, keyTwo) {
    let html = "<table border='1|1'>";

    for (let i = 0; i < data.length; i++) {
        if (data[i].middle_name != null) {
            html += "<tr>";
            html += "<td>" + (data[i].first_name + ' ' + data[i].middle_name + ' ' + data[i].last_name).link(data[i].url) + "</td>";
            html += "<td>" + data[i][keyOne] + "</td>";
            html += "<td>" + data[i][keyTwo] + '%' + "</td>";
            html += "</tr>";
        } else if (data[i].middle_name == null) {
            html += "<tr>";
            html += "<td>" + (data[i].first_name + ' ' + data[i].last_name).link(data[i].url) + "</td>";
            html += "<td>" + data[i][keyOne] + "</td>";
            html += "<td>" + data[i][keyTwo] + '%' + "</td>";
            html += "</tr>";
        }
    }

    html += "</tbody>";
    document.getElementById(tableId).innerHTML = html;
}
