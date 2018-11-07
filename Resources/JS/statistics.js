const members = data.results[0].members;



var statistics = {
    'Number of Democrats': totalNumber('D'),
    'Number of Republicans': totalNumber('R'),
    'Number of Independents': totalNumber('I'),
    'PercentageVotedParty': '0',

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

let demoLength = totalNumber('D');
let repuLength = totalNumber('R');
let indeLength = totalNumber('I');

//console.log(demoLength);
//console.log(repuLength);
//console.log(indeLength);


// Total percentage voted for each party

function totalVotedPerc(par) {
    let total = 0;

    for (let i = 0; i < members.length; i++) {
        if (members[i].party == par) {
            total += members[i].votes_with_party_pct;
        }
    }
    return total;
}

let demoVotPerc = totalVotedPerc('D');
let repuVotPerc = totalVotedPerc('R');
let indeVotPerc = totalVotedPerc('I');

let averPVDemo = demoVotPerc / demoLength;
let averPVRepu = repuVotPerc / repuLength;
let averPVInde = indeVotPerc / indeLength;

//console.log(averPVDemo);
//console.log(averPVRepu);
//console.log(averPVInde);


// Least Engaged: Bottom 10% of Voted with Party Percentage for all Parties
// Most Engaged: Top 10% of Voted with Party Percentage for all Parties


let leastEngaged = [...members].sort(function (a, b) {
    return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
});

let mostEngaged = [...members].sort(function (c, d) {
    return parseFloat(d.votes_with_party_pct) - parseFloat(c.votes_with_party_pct);
});



// Least Loyal: Top 10% of Missed Votes Percentage (10% Highest Percentages)
// Most Engaged: Bottom 10% of Missed Votes Percentage (10% Smallest Percentages)


let leastLoyal = [...members].sort(function(e, f) {
    return parseFloat(f.missed_votes_pct) - parseFloat(e.missed_votes_pct);
});

let mostLoyal = [...members].sort(function(g, h) {
    return parseFloat(g.missed_votes_pct) - parseFloat(h.missed_votes_pct);
});



//function to calculate the 10% with three arguments: one array, one value and the order


function find10Percent(arr, value, order) {
    let newArray = [];
    let newValue = (arr.length / 10);
    let newLength = newValue.toFixed(0);
    let comparator = arr[newLength][value];
    console.log(comparator);

    for (let i = 0; i < arr.length; i++) {        
        if (arr[i][value] <= comparator && order == "asc") {
            newArray.push(arr[i]);
        }

        if (arr[i][value] >= comparator && order == "des") {
            newArray.push(arr[i]);
        }
    }
    console.log(newArray);
}


find10Percent(leastEngaged, "votes_with_party_pct", "asc");
find10Percent(mostEngaged, "votes_with_party_pct", "des");


find10Percent(leastLoyal, "missed_votes_pct", "des");
find10Percent(mostLoyal, "missed_votes_pct", "asc");



