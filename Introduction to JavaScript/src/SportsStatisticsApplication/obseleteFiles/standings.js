let currentSortField = 'ranking';
let sortDirection = 'DSC';
let allTeams = [];
let sortedTeams = [];

function getStandings(){
    fetch('standings.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((team) => {
            if (localStorage.getItem("newMatches") != null)
                updateStandings(team);
            let row = createRow(team);
            document.querySelector('#rows').appendChild(row);
        });
        allTeams = data;
        sortedTeams = allTeams;
    })
}

function sortStandings() {
    document.querySelector('#rows').innerHTML = '';
    sortedTeams.forEach(team => { let row = createRow(team); document.querySelector('#rows').appendChild(row);});
}

function createRow(stat) {
    let newRow = document.createElement('tr');
    newRow.setAttribute('scope', 'row');
    let newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.ranking));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(getFlag(stat.team));
    newCell.appendChild(document.createTextNode(stat.team));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.totalMatches));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.wonMatches));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.lostMatches));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.points));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.totalSets));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.wonSets));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.lostSets));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.threeZero));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.threeOne));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.threeTwo));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.twoThree));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.oneThree));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.zeroThree));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.wonPoints));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.lostPoints));
    newRow.appendChild(newCell);

    return newRow;
}

function getFlag(team) {
    let flag = document.createElement('img');
    flag.src = `imgs/${team}.png`;
    flag.style.width = '50px';
    flag.style.marginRight = '10px';


    return flag;
}

function sort(field) {              // USE IF STATEMENTS INSIDE THE INDIVIDUAL IFS TO MAKE IT SO THAT FOR EXAMPLE IF POINTS ARE THE SAME, DETERMINE IT BASED ON RANKING OR WHATEVER THAT ACTUAL TIEBREAKER IS!!!!!!!!!!!!
    if (field === undefined) {
       // when it is called from filter
       field = currentSortField;
    } else if (field === currentSortField) {
       sortDirection = sortDirection === 'ASC' ? 'DSC' : 'ASC';
       currentSortField = field;
    } else {
       sortDirection = 'ASC';
       currentSortField = field;  
    }
 
    if (sortDirection === 'ASC') {
       if (field === 'ranking')
            sortedTeams.sort((a, b) => b.ranking - a.ranking);
       else if (field === 'team')
            sortedTeams.sort((a, b) => a.team.localeCompare(b.team));
       else if (field === 'totalMatches')
            sortedTeams.sort((a, b) => a.totalMatches - b.totalMatches);
       else if (field === 'wonMatches')
            sortedTeams.sort((a, b) => a.wonMatches - b.wonMatches);
        else if (field === 'lostMatches')
            sortedTeams.sort((a, b) => a.lostMatches - b.lostMatches);
        else if (field === 'points')
            sortedTeams.sort((a, b) => a.points - b.points);
        else if (field === 'totalSets')
            sortedTeams.sort((a, b) => a.totalSets - b.totalSets);
        else if (field === 'wonSets')
            sortedTeams.sort((a, b) => a.wonSets - b.wonSets);
        else if (field === 'lostSets')
            sortedTeams.sort((a, b) => a.lostSets - b.lostSets);
        else if (field === 'threeZero')
            sortedTeams.sort((a, b) => a.threeZero - b.threeZero);
        else if (field === 'threeOne')
            sortedTeams.sort((a, b) => a.threeOne - b.threeOne);
        else if (field === 'threeTwo')
            sortedTeams.sort((a, b) => a.threeTwo - b.threeTwo);
        else if (field === 'twoThree')
            sortedTeams.sort((a, b) => a.twoThree - b.twoThree);
        else if (field === 'oneThree')
            sortedTeams.sort((a, b) => a.oneThree - b.oneThree);
        else if (field === 'zeroThree')
            sortedTeams.sort((a, b) => a.zeroThree - b.zeroThree);
        else if (field === 'wonPoints')
            sortedTeams.sort((a, b) => a.wonPoints - b.wonPoints);
        else if (field === 'lostPoints')
            sortedTeams.sort((a, b) => a.lostPoints - b.lostPoints);
    } else if (sortDirection === 'DSC') {
        if (field === 'ranking')
            sortedTeams.sort((a, b) => a.ranking - b.ranking);
        else if (field === 'team')
                sortedTeams.sort((a, b) => b.team.localeCompare(a.team));
        else if (field === 'totalMatches')
                sortedTeams.sort((a, b) => b.totalMatches - a.totalMatches);
        else if (field === 'wonMatches')
                sortedTeams.sort((a, b) => b.wonMatches - a.wonMatches);
        else if (field === 'lostMatches')
            sortedTeams.sort((a, b) => b.lostMatches - a.lostMatches);
        else if (field === 'points')
            sortedTeams.sort((a, b) => b.points - a.points);
        else if (field === 'totalSets')
            sortedTeams.sort((a, b) => b.totalSets - a.totalSets);
        else if (field === 'wonSets')
            sortedTeams.sort((a, b) => b.wonSets - a.wonSets);
        else if (field === 'lostSets')
            sortedTeams.sort((a, b) => b.lostSets - a.lostSets);
        else if (field === 'threeZero')
            sortedTeams.sort((a, b) => b.threeZero - a.threeZero);
        else if (field === 'threeOne')
            sortedTeams.sort((a, b) => b.threeOne - a.threeOne);
        else if (field === 'threeTwo')
            sortedTeams.sort((a, b) => b.threeTwo - a.threeTwo);
        else if (field === 'twoThree')
            sortedTeams.sort((a, b) => b.twoThree - a.twoThree);
        else if (field === 'oneThree')
            sortedTeams.sort((a, b) => b.oneThree - a.oneThree);
        else if (field === 'zeroThree')
            sortedTeams.sort((a, b) => b.zeroThree - a.zeroThree);
        else if (field === 'wonPoints')
            sortedTeams.sort((a, b) => b.wonPoints - a.wonPoints);
        else if (field === 'lostPoints')
            sortedTeams.sort((a, b) => b.lostPoints - a.lostPoints);
    }
    sortStandings();
}
 
function filterTeams() {
    let filterValue = document.querySelector('#filter').value;
    sortedTeams = allTeams.filter(team => (team.team.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0));
    sort();
}

function updateStandings(team) {
    JSON.parse(localStorage.getItem('newMatches')).forEach(newMatch => {
        if (team === newMatch.home) {
            team.totalMatches++;
            team.wonMatches += newMatch.homeSets - newMatch.awaySets > 0 ? 1 : 0;
            team.lostMatches += newMatch.homeSets - newMatch.awaySets < 0 ? 1 : 0;
            team.points += newMatch.homeSets === 3 && newMatch.awaySets === 0 ? 3 : newMatch.homeSets === 3 && newMatch.awaySets === 1 ? 3 : newMatch.homeSets === 3 && newMatch.awaySets === 2 ? 2 : 0;
            if (newMatch.homeSets === 3 && newMatch.awaySets === 2)
                away.points++; // FIGURE OUT A WAY TO ACCESS OTHER TEAM WHILE ACCESSING HOME/FIRST TEAM BECAUSE 1PT AWARDED TO LOSING TEAM IF SCORE IS 3-2. THIS DOESN'T WORK!!! IS JUST A PLACEHOLDER
            team.totalSets += newMatch.homeSets + newMatch.awaySets;
            team.wonSets += newMatch.homeSets;
            team.lostSets += newMatch.awaySets;
            team.threeZero += newMatch.homeSets === 3 && newMatch.awaySets === 0 ? 1 : 0;
            team.threeOne += newMatch.homeSets === 3 && newMatch.awaySets === 1 ? 1 : 0;
            team.threeTwo += newMatch.homeSets === 3 && newMatch.awaySets === 2 ? 1 : 0;
            team.twoThree += newMatch.homeSets === 2 && newMatch.awaySets === 3? 1 : 0;
            team.oneThree += newMatch.homeSets === 1 && newMatch.awaySets === 3? 1 : 0;
            team.zeroThree += newMatch.homeSets === 0 && newMatch.awaySets === 3? 1 : 0;
            team.wonPoints += newMatch.gameOne.substring(0, 2) + newMatch.gameTwo.substring(0, 2) + newMatch.gameThree.substring(0, 2) + newMatch.gameFour.substring(0, 2) + newMatch.gameFive.substring(0, 2);
            team.lostPoints += newMatch.gameOne.substring(3) + newMatch.gameTwo.substring(3) + newMatch.gameThree.substring(3) + newMatch.gameFour.substring(3) + newMatch.gameFive.substring(3);
        } else if (team === newMatch.away) {
            team.totalMatches++;
            team.wonMatches += newMatch.awaySets - newMatch.homeSets > 0 ? 1 : 0;
            team.lostMatches += newMatch.awaySets - newMatch.homeSets < 0 ? 1 : 0;
            team.points += newMatch.awaySets === 3 && newMatch.homeSets === 0 ? 3 : newMatch.awaySets === 3 && newMatch.homeSets === 1 ? 3 : newMatch.awaySets === 3 && newMatch.homeSets === 2 ? 2 : 0;
            if (newMatch.awaySets === 3 && newMatch.homeSets === 2)
                away.points++; // FIGURE OUT A WAY TO ACCESS OTHER TEAM WHILE ACCESSING HOME/FIRST TEAM BECAUSE 1PT AWARDED TO LOSING TEAM IF SCORE IS 3-2. THIS DOESN'T WORK!!! IS JUST A PLACEHOLDER
            team.totalSets += newMatch.awaySets + newMatch.homeSets;
            team.wonSets += newMatch.awaySets;
            team.lostSets += newMatch.awaySets;
            team.threeZero += newMatch.awaySets === 3 && newMatch.homeSets === 0 ? 1 : 0;
            team.threeOne += newMatch.awaySets === 3 && newMatch.homeSets === 1 ? 1 : 0;
            team.threeTwo += newMatch.awaySets === 3 && newMatch.homeSets === 2 ? 1 : 0;
            team.twoThree += newMatch.awaySets === 2 && newMatch.homeSets === 3? 1 : 0;
            team.oneThree += newMatch.awaySets === 1 && newMatch.homeSets === 3? 1 : 0;
            team.zeroThree += newMatch.awaySets === 0 && newMatch.homeSets === 3? 1 : 0;
            team.wonPoints += newMatch.gameOne.substring(3) + newMatch.gameTwo.substring(3) + newMatch.gameThree.substring(3) + newMatch.gameFour.substring(3) + newMatch.gameFive.substring(3);
            team.lostPoints += newMatch.gameOne.substring(0, 2) + newMatch.gameTwo.substring(0, 2) + newMatch.gameThree.substring(0, 2) + newMatch.gameFour.substring(0, 2) + newMatch.gameFive.substring(0, 2);
        }
    })
}


getStandings();