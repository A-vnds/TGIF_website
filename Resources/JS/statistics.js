const members = data.results[0].members;



var tableStats = {
    'Number of Democrats' : '0' ,
    'Number of Republicans' : '0',
    'Number of Independents' : '0',
    'PercentageVotedParty' : '0',
}



// Number of Candidates Function


function totalNumber(par) {
    let arr = [];
    let total = 0;
        for (let i = 0; i < members.length; i++){
       if (members[i].party == par) {
        arr.push(members[i]);
       }   
    }
    return total = arr.length;
}
        
let demoLength = totalNumber('D');
let repuLength = totalNumber('R');
let indeLength = totalNumber('I');

console.log(demoLength);
console.log(repuLength);
console.log(indeLength);


// Total percentage voted for each party

function totalVotedPerc (par) {
    let total = 0;
    
    for (let i = 0; i < members.length; i++){
       if (members[i].party == par) {
        total += members[i].votes_with_party_pct;  
       }   
    } 
    return total;
}

let demoVotPerc = totalVotedPerc ('D');
let repuVotPerc = totalVotedPerc ('R');
let indeVotPerc = totalVotedPerc ('I');

let averPVDemo = demoVotPerc / demoLength;
let averPVRepu = repuVotPerc/ repuLength;
let averPVInde = indeVotPerc / indeLength;

console.log(averPVDemo);
console.log(averPVRepu);
console.log(averPVInde);







