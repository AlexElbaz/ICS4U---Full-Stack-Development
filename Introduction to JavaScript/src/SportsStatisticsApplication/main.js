let allTeams = [];
let validTeams = []

let sortedTeams = [];
let currentSortField = 'ranking';
let sortDirection = 'DSC';

let allMatches = [];
let matches = [];

let pageNum = 1;
let startingMatches = 120;

// Used to push the standings json to the local storage on startup of page.
if (localStorage.getItem('standings') === null) {
    fetch('standings.json')
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('standings', JSON.stringify(data));
    });
}

// Used to push the matchStatistics json to the local storage on startup of page.
if (localStorage.getItem('matches') === null) {
    fetch('matchStatistics.json')
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('matches', JSON.stringify(data));
    });
}

// To initialize the valid teams array to the list of valid teams (must be done after local storage is created).
JSON.parse(localStorage.getItem('standings')).forEach(team => validTeams.push(team.team));

// Called upon load of standings.html. Builds the standings using various other helper methods.
function getStandings() {
    allTeams = JSON.parse(localStorage.getItem('standings'));
    allTeams.forEach(team => {
        updateStandings(team);
    });

    updateRankings(); // Because of the way updateRankings works, needs to be called once all the teams have their stats loaded

    allTeams.forEach(team => {
        let row = createRow(team);
        document.querySelector('#rows').appendChild(row);
    });

    sortedTeams = allTeams;
}

// Creates a row of the standings table for a specific team passed in each call.
function createRow(team) {
    let newRow = document.createElement('tr');
    newRow.setAttribute('scope', 'row');
    let newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.ranking));
    newCell.classList.add('text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(getFlagsForStandings(team.team));
    newCell.appendChild(document.createTextNode(team.team));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.totalMatches));
    newCell.classList.add('text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.wonMatches));
    newCell.classList.add('text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.lostMatches));
    newCell.classList.add('text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.points));
    newCell.classList.add('text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.totalSets));
    newCell.classList.add('d-none', 'd-lg-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.wonSets));
    newCell.classList.add('d-none', 'd-lg-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.lostSets));
    newCell.classList.add('d-none', 'd-lg-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.threeZero));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.threeOne));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.threeTwo));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.twoThree));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.oneThree));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.zeroThree));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.totalPoints));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.wonPoints));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(team.lostPoints));
    newCell.classList.add('d-none', 'd-xl-table-cell', 'text-center');
    newRow.appendChild(newCell);

    return newRow;
}

// Gets flags from imgs folder and styles them to fit appropriately for the standings.
function getFlagsForStandings(team) {
    let flag = document.createElement('img');
    flag.src = `imgs/${team}.png`;
    flag.style.width = '50px';
    flag.classList.add('d-none', 'd-sm-inline');
    flag.style.marginRight = '10px';

    return flag;
}

// Creates/updates the standings based on the matches in localStorage.
function updateStandings(team) {
    JSON.parse(localStorage.getItem('matches')).forEach(newMatch => {
        if (team.team === newMatch.home) {
            team.totalMatches++;
            team.wonMatches += newMatch.homeSets - newMatch.awaySets > 0 ? 1 : 0;
            team.lostMatches += newMatch.homeSets - newMatch.awaySets < 0 ? 1 : 0;
            team.points += newMatch.homeSets === 3 && newMatch.awaySets === 0 ? 3 : newMatch.homeSets === 3 && newMatch.awaySets === 1 ? 3 : newMatch.homeSets === 3 && newMatch.awaySets === 2 ? 2 : newMatch.homeSets === 2 && newMatch.awaySets === 3 ? 1 : 0;
                // Checks the amount of sets in which the team won (or lost in the case of lost 2-3) and awards a specific number of points based off of it.
            team.totalSets += newMatch.homeSets + newMatch.awaySets;
            team.wonSets += newMatch.homeSets;
            team.lostSets += newMatch.awaySets; 
            team.threeZero += newMatch.homeSets === 3 && newMatch.awaySets === 0 ? 1 : 0;
            team.threeOne += newMatch.homeSets === 3 && newMatch.awaySets === 1 ? 1 : 0;
            team.threeTwo += newMatch.homeSets === 3 && newMatch.awaySets === 2 ? 1 : 0;
            team.twoThree += newMatch.homeSets === 2 && newMatch.awaySets === 3 ? 1 : 0;
            team.oneThree += newMatch.homeSets === 1 && newMatch.awaySets === 3 ? 1 : 0;
            team.zeroThree += newMatch.homeSets === 0 && newMatch.awaySets === 3 ? 1 : 0;
            team.wonPoints += parseInt(newMatch.setOne.substring(0, 2), 10) + parseInt(newMatch.setTwo.substring(0, 2), 10) + parseInt(newMatch.setThree.substring(0, 2), 10) + (newMatch.setFour != null ? parseInt(newMatch.setFour.substring(0, 2), 10) : 0) + (newMatch.setFive != null ? parseInt(newMatch.setFive.substring(0, 2), 10) : 0);
                // parses all the scores into numbers (has to check if scores for set 4 and 5 exist first) and adds them to stat.
            team.lostPoints += parseInt(newMatch.setOne.substring(3), 10) + parseInt(newMatch.setTwo.substring(3), 10) + parseInt(newMatch.setThree.substring(3), 10) + (newMatch.setFour != null ? parseInt(newMatch.setFour.substring(3), 10) : 0) + (newMatch.setFive != null ? parseInt(newMatch.setFive.substring(3), 10) : 0);
            team.totalPoints = team.wonPoints + team.lostPoints;
        } else if (team.team === newMatch.away) {
            team.totalMatches++;
            team.wonMatches += newMatch.awaySets - newMatch.homeSets > 0 ? 1 : 0;
            team.lostMatches += newMatch.awaySets - newMatch.homeSets < 0 ? 1 : 0;
            team.points += newMatch.awaySets === 3 && newMatch.homeSets === 0 ? 3 : newMatch.awaySets === 3 && newMatch.homeSets === 1 ? 3 : newMatch.awaySets === 3 && newMatch.homeSets === 2 ? 2 : newMatch.awaySets === 2 && newMatch.homeSets === 3 ? 1 : 0;
            team.totalSets += newMatch.awaySets + newMatch.homeSets;
            team.wonSets += newMatch.awaySets;
            team.lostSets += newMatch.homeSets;
            team.threeZero += newMatch.awaySets === 3 && newMatch.homeSets === 0 ? 1 : 0;
            team.threeOne += newMatch.awaySets === 3 && newMatch.homeSets === 1 ? 1 : 0;
            team.threeTwo += newMatch.awaySets === 3 && newMatch.homeSets === 2 ? 1 : 0;
            team.twoThree += newMatch.awaySets === 2 && newMatch.homeSets === 3? 1 : 0;
            team.oneThree += newMatch.awaySets === 1 && newMatch.homeSets === 3? 1 : 0;
            team.zeroThree += newMatch.awaySets === 0 && newMatch.homeSets === 3? 1 : 0;
            team.wonPoints += parseInt(newMatch.setOne.substring(3), 10) + parseInt(newMatch.setTwo.substring(3), 10) + parseInt(newMatch.setThree.substring(3), 10) + (newMatch.setFour != null ? parseInt(newMatch.setFour.substring(3), 10) : 0) + (newMatch.setFive != null ? parseInt(newMatch.setFive.substring(3), 10) : 0);
            team.lostPoints += parseInt(newMatch.setOne.substring(0, 2), 10) + parseInt(newMatch.setTwo.substring(0, 2), 10) + parseInt(newMatch.setThree.substring(0, 2), 10) + (newMatch.setFour != null ? parseInt(newMatch.setFour.substring(0, 2), 10) : 0) + (newMatch.setFive != null ? parseInt(newMatch.setFive.substring(0, 2), 10) : 0);
            team.totalPoints = team.wonPoints + team.lostPoints;
        }
    })
}

// Assigns/updates rankings based on 
function updateRankings() {
    allTeams.sort((a, b) => b.points - a.points === 0 ? (b.wonSets/b.lostSets) - (a.wonSets/a.lostSets) : b.points - a.points);
        // Sorts array by descending points (most points to least points). If points are tied then (higher) set quotient (wonSets/lostSets) determines winner.
    for (let i = 0; i < allTeams.length; i++) {
        allTeams[i].ranking = i+1;  // sets the ranking for each team based on their place in the newly sorted array of teams.
    }
}

// Sorts the sortedTeams array based on a certain sorting direction and calls sortStandings() in order to visibly sort the table.
function sort(field) {
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
            sortedTeams.sort((a, b) => a.team.localeCompare(b.team)); // Like compareTo() method, will end up sorting by alphabetical order
       else if (field === 'totalMatches')
            sortedTeams.sort((a, b) => a.totalMatches - b.totalMatches);
       else if (field === 'wonMatches')
            sortedTeams.sort((a, b) => a.wonMatches - b.wonMatches);
        else if (field === 'lostMatches')
            sortedTeams.sort((a, b) => a.lostMatches - b.lostMatches);
        else if (field === 'points')
            sortedTeams.sort((a, b) => a.points - b.points === 0 ? (a.wonSets/a.lostSets) - (b.wonSets/b.lostSets) : a.points - b.points); // If points are tied then (higher) set quotient (wonSets/lostSets) determines winner.
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
        else if (field === 'totalPoints')
            sortedTeams.sort((a, b) => a.totalPoints - b.totalPoints);
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
            sortedTeams.sort((a, b) => b.points - a.points === 0 ? (b.wonSets/b.lostSets) - (a.wonSets/a.lostSets) : b.points - a.points); // If points are tied then (higher) set quotient (wonSets/lostSets) determines winner.
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
        else if (field === 'totalPoints')
            sortedTeams.sort((a, b) => b.totalPoints - a.totalPoints);
        else if (field === 'wonPoints')
            sortedTeams.sort((a, b) => b.wonPoints - a.wonPoints);
        else if (field === 'lostPoints')
            sortedTeams.sort((a, b) => b.lostPoints - a.lostPoints);
    }

    sortStandings();
}

// Remakes the table based on a specific sort direction executed by the sort(field) method.
function sortStandings() {
    document.querySelector('#rows').innerHTML = ''; // resets table.
    sortedTeams.forEach(team => {   // remakes table in order of the sort direction sortedTeams was changed to.
        let row = createRow(team);
        document.querySelector('#rows').appendChild(row);
    });
}

// Filters the teams by name based on an input in the filter input area.
function filterTeams() {
    let filterValue = document.querySelector('#filter').value;
    sortedTeams = allTeams.filter(team => (team.team.toLowerCase().indexOf(filterValue.toLowerCase()) === 0));
        // filters teams based on if input excatly matches any team names (not case sensitive).
    sort();
}


// Called upon load of matches.html. Creates match pages by creating all of the match elements and only displaying 10 at a time depeding on pageNum.
function getTenMatches() {
    document.querySelector(`#btn${pageNum}`).classList.add("active"); // Makes button of current page darker.

    allMatches = JSON.parse(localStorage.getItem('matches'));
    allMatches.reverse(); // To make JSON in order from most recent to least recent match.
    allMatches.forEach(match => {
        let body = createMatch(match);
        matches.push(body);
    });

    // Goes through the matches array and only displays the 10 matches that are supposed to be displayed on that given page. 
    for (let i = 0; i < matches.length; i++) {
        if (i >= (pageNum - 1) * 10 && i < (pageNum) * 10)
            document.querySelector('#rows').appendChild(matches[i]);
    }
}

// Creates the match elements based on the specific match passed in each call.
function createMatch(match) {
    let newBody = document.createElement('tbody');
    newBody.setAttribute('scope', 'body');
    newBody.classList.add('card', 'w-75', 'mx-auto', 'mb-3', 'bg-tertiary');


    let firstNewRow = document.createElement('div');
    firstNewRow.classList.add('card-title','mx-md-5', 'mt-4', 'mb-0', 'text-center');
    firstNewRow.setAttribute('scope', 'row');

    let newCell = document.createElement('td');
    newCell.appendChild(getFlagsForMatches(match.home));
    newCell.appendChild(document.createTextNode(match.home));
    newCell.classList.add('me-md-3', 'd-inline', 'h3');
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.homeSets));
    newCell.classList.add('ms-md-3', 'me-1', 'd-inline', 'h5');
    if (match.homeSets > match.awaySets) // Used to make the team who won's sets red so that it is easy to see who won.
        newCell.classList.add('text-danger'); 
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(' : '));
    newCell.classList.add('d-inline', 'h5');
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.awaySets));
    newCell.classList.add('ms-1', 'me-md-3', 'd-inline', 'h5');
    if (match.awaySets > match.homeSets) // Makes the team who won's sets red so that it is easy to see who won.
        newCell.classList.add('text-danger');
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.away));
    newCell.appendChild(getFlagsForMatches(match.away));
    newCell.classList.add('ms-md-3', 'd-inline', 'h3');
    firstNewRow.appendChild(newCell);

    newBody.appendChild(firstNewRow);
    

    let secondNewRow = document.createElement('div');
    secondNewRow.setAttribute('scope', 'row');
    secondNewRow.classList.add('card-body', 'align-self-center', 'mb-2');

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.setOne));
    newCell.classList.add('mx-md-2', 'd-inline');
    secondNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.setTwo));
    newCell.classList.add('mx-md-2', 'd-inline');
    secondNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.setThree));
    newCell.classList.add('mx-md-2', 'd-inline');
    secondNewRow.appendChild(newCell);

    if (match.setFour != null) {
        newCell = document.createElement('td');
        newCell.appendChild(document.createTextNode(match.setFour));
        newCell.classList.add('mx-md-2', 'd-inline');
        secondNewRow.appendChild(newCell);

        if (match.setFive != null) {
            newCell = document.createElement('td');
            newCell.appendChild(document.createTextNode(match.setFive));
            newCell.classList.add('mx-md-2', 'd-inline');
            secondNewRow.appendChild(newCell);
        }
    }

    newBody.appendChild(secondNewRow)

    return newBody;
}

// Gets flags from imgs folder and styles them to fit appropriately for the matches.
function getFlagsForMatches(team) {
    let flag = document.createElement('img');
    if (validTeams.includes(team))  // If the team passed in is valid (it is one of the teams that played in this season) then grab the image for its flag.
        flag.src = `imgs/${team}.png`;
    else    // If the team passed in is not a valid team, grab the image for the generic question mark flag.
        flag.src = `imgs/questionMark.jpg`;
    flag.classList.add('d-none', 'd-xl-inline');
    flag.style.width = '15%';
    flag.style.marginLeft = '10px';
    flag.style.marginRight = '10px';

    return flag;
}

// Called when one of the page buttons is pressed. Changes the page to a new set of matches depending on newPage. 
function changePage(newPage) {
    document.querySelector(`#btn${pageNum}`).classList.remove("active");
    pageNum = newPage;
    matches = [];   // Resets matches array so that when getTenMatches() is called again, it doesn't push more onto the already populated array.
    document.querySelector('#rows').innerHTML = '';
    getTenMatches();
}

// Called when #btnPrev is pressed. Changes the page to a new set of matches, those being from the previous page.
function previousPage() {
    if (pageNum > 1) {  // Stops user from going below page 1 (which doesn't exist).
        document.querySelector(`#btn${pageNum}`).classList.remove("active");
        pageNum -= 1;
        matches = [];
        document.querySelector('#rows').innerHTML = '';
        getTenMatches();
    }
}

// Called when #btnNext is pressed. Changes the page to a new set of matches, those being from the next page.
function nextPage() {
    if (pageNum < Math.ceil(matches.length/10)) {  // Stops user from going to a page higher than would exist based on the amount of matches in matches array (i.e. if there are 120 matches, there are 12 pages. This stops the user from attempting to go to the 13th page which doesn't exist (until new matches are added)).
        document.querySelector(`#btn${pageNum}`).classList.remove("active");
        pageNum += 1;
        matches = [];
        document.querySelector('#rows').innerHTML = '';
        getTenMatches();
    }
}

// Called upon load of matches.html. Creates new page buttons depending on the amount of matches added (i.e. if there were over 120 matches, there would be a 13th page and so a page 13 button is needed to easily access that page).
function createNewPage() {
    let numMatches = JSON.parse(localStorage.getItem('matches')).length;
    if (numMatches > startingMatches) {
        document.querySelector('#btn12').classList.add('btn', 'btn-secondary', 'd-none', 'd-md-inline'); // To make page 12 button disappear when the rest of the buttons disappear (below md screen width) if there is a page after page 12 (because only numbered buttons wanted are for first and last page).
        for (let i = startingMatches; i < numMatches; i+=10) {
            let newButton = document.createElement('button');
            newButton.setAttribute('type', 'button');
            newButton.setAttribute('id', `btn${i/10 + 1}`); // i starts at 120 and goes up by 10, so i/10 + 1 will always yield the whole number of the next button/page wanted.
            newButton.setAttribute('onclick', `changePage(${i/10 + 1})`);
            newButton.innerHTML = `${i/10 + 1}`;
            newButton.classList.add('btn', 'btn-secondary');
            if (i+10 < numMatches)  // If there is going to be another button (meaning another page) after this button, make it disappear along with the other buttons as well (because again, only numbered buttons wanted are for first and last page).
                newButton.classList.add('d-none', 'd-md-inline');
            document.querySelector('#pageButtons').appendChild(newButton);
        }
    } else  // In case the new matches are cleared, want page 12 button to display again.
        document.querySelector('#btn12').classList.remove('d-none', 'd-md-inline');
}


// Called when Add New Match button is pressed with adequate information in the form. Creates a new match based on the inputs in the form.
function createNewMatch() {
    // Splits the scores from each set. Used to determine whether they are valid in future if statements
    let setOneScore = document.querySelector('#setOne').value.split('-');
    let setTwoScore = document.querySelector('#setTwo').value.split('-');
    let setThreeScore = document.querySelector('#setThree').value.split('-');
    let setFourScore = document.querySelector('#setFour').value.split('-');
    let setFiveScore = document.querySelector('#setFive').value.split('-');

    // Figures out who won what set in order to determine some stats to put in the new match as well as limit some inputs
    let homeSets = 0;
    let awaySets = 0;

    if (document.querySelector('#setOne').value.substring(0, 2) > document.querySelector('#setOne').value.substring(3))
        homeSets++;
    else
        awaySets++;
    if (document.querySelector('#setTwo').value.substring(0, 2) > document.querySelector('#setTwo').value.substring(3))
        homeSets++;
    else
        awaySets++;
    if (document.querySelector('#setThree').value.substring(0, 2) > document.querySelector('#setThree').value.substring(3))
        homeSets++;
    else
        awaySets++;
    if (document.querySelector('#setFour').value != '') {
        if (document.querySelector('#setFour').value.substring(0, 2) > document.querySelector('#setFour').value.substring(3))
            homeSets++;
        else
            awaySets++;
        if (document.querySelector('#setFive').value != '') {
        if (document.querySelector('#setFive').value.substring(0, 2) > document.querySelector('#setFive').value.substring(3))
            homeSets++;
        else
            awaySets++;
        }
    }

    // Limits the user's inputs and displays an error message if they do it wrong so that they cannot mess up the future program executions.
    if (document.querySelector('#homeTeam').value === '' || document.querySelector('#awayTeam').value === '' || document.querySelector('#setOne').value === '' || document.querySelector('#setTwo').value === '' || document.querySelector('#setThree').value === '') // If any of the required fields are not filled out, don't make a match and let the user know.
        formErrorMessage('You must fill out all the required fields (all of those which do not have OPTIONAL on them).');
    else if (setOneScore.length != 2 || Number(setOneScore[0]) === false || Number(setOneScore[1]) === false) // If the score for setOne is not valid/formatted correctly, don't make a match and let the user know.
        formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
    else if (setTwoScore.length != 2 || Number(setTwoScore[0]) === false || Number(setTwoScore[1]) === false)
        formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
    else if (setThreeScore.length != 2 || Number(setThreeScore[0]) === false || Number(setThreeScore[1]) === false)
        formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
    else if (document.querySelector('#setFour').value === '' && document.querySelector('#setFive').value != '') // If the user put in a score for set 5 but not one for set 4, don't make a match and let them know.
        formErrorMessage('A score for set 5 cannot exist without a score for set 4.');
    else if (parseInt(setOneScore[0], 10) === parseInt(setOneScore[1], 10)) // If setOne's score is tied, don't make a match and let the user know.
        formErrorMessage('No scores can be tied.');
    else if (parseInt(setTwoScore[0], 10) === parseInt(setTwoScore[1], 10))
        formErrorMessage('No scores can be tied.');
    else if (parseInt(setThreeScore[0], 10) === parseInt(setThreeScore[1], 10))
        formErrorMessage('No scores can be tied.');
    else if ((parseInt(setOneScore[0], 10) != 25 && parseInt(setOneScore[1], 10) != 25)) {  // If neither of the scores are 25, look into the score further.
        if ((parseInt(setOneScore[0], 10) >= 24 && parseInt(setOneScore[1], 10) >= 24) && (Math.abs(parseInt(setOneScore[0], 10) - parseInt(setOneScore[1], 10)) != 2)) // If both of the scores are above 24 (the only situation where neither of the scores being 25 is possibly acceptable (win by two case)) but the difference between them is not two (meaning the set was not won by two and as such is invalid), don't make a match and let the user know.
            formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
        else if (parseInt(setOneScore[0], 10) < 25 && parseInt(setOneScore[1], 10) < 25) // If both scores are less than 25, don't make a match and let the user know.
            formErrorMessage('One team MUST reach 25 in order to win a set.');
        else    // Otherwise (meaning that both scores were 24 or above and the difference was 2 (win by two set)), make a match and let the user know.
            getNewMatch(homeSets, awaySets);
    } else if ((parseInt(setTwoScore[0], 10) != 25 && parseInt(setTwoScore[1], 10) != 25)) {
        if ((parseInt(setTwoScore[0], 10) >= 24 && parseInt(setTwoScore[1], 10) >= 24) && (Math.abs(parseInt(setTwoScore[0], 10) - parseInt(setTwoScore[1], 10)) != 2))
            formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
        else if (parseInt(setTwoScore[0], 10) < 25 && parseInt(setTwoScore[1], 10) < 25)
            formErrorMessage('One team MUST reach 25 in order to win a set.');
        else
            getNewMatch(homeSets, awaySets);
    } else if ((parseInt(setThreeScore[0], 10) != 25 && parseInt(setThreeScore[1], 10) != 25)) {
        if ((parseInt(setThreeScore[0], 10) >= 24 && parseInt(setThreeScore[1], 10) >= 24) && (Math.abs(parseInt(setThreeScore[0], 10) - parseInt(setThreeScore[1], 10)) != 2))
            formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
        else if (parseInt(setThreeScore[0], 10) < 25 && parseInt(setThreeScore[1], 10) < 25)
            formErrorMessage('One team MUST reach 25 in order to win a set.');
        else
            getNewMatch(homeSets, awaySets);
    } else if (document.querySelector('#setFour').value != '') {
        if (homeSets > 3 || awaySets > 3)   // If home or away has won 4 sets (meaning that the user input a set (or two) beyond what should have been inputted as either home or away already won the match), the match should be over, so no 4th (or 5th depending on the input) set should exist. As such, don't make a match and let the user know. 
            formErrorMessage('There cannot be more sets if a team has already won 3 sets.');
        
        if (setFourScore.length != 2 || Number(setFourScore[0]) === false || Number(setFourScore[1]) === true)
            formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
        else if (parseInt(setFourScore[0], 10) === parseInt(setFourScore[1], 10))
            formErrorMessage('No scores can be tied.');
        else if ((parseInt(setFourScore[0], 10) != 25 && parseInt(setFourScore[1], 10) != 25)) {
            if ((parseInt(setFourScore[0], 10) >= 24 && parseInt(setFourScore[1], 10) >= 24) && (Math.abs(parseInt(setFourScore[0], 10) - parseInt(setFourScore[1], 10)) != 2))
                formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
            else if (parseInt(setFourScore[0], 10) < 25 && parseInt(setFourScore[1], 10) < 25)
                formErrorMessage('One team MUST reach 25 in order to win a set.');
            else if (document.querySelector('#setFive').value === '')
                getNewMatch(homeSets, awaySets);
        }

        if (document.querySelector('#setFive').value != '') {
            if (setFiveScore.length != 2 || Number(setFiveScore[0]) === false || Number(setFiveScore[1]) === true)
                formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
            else if (parseInt(setOneScore[0], 10) === parseInt(setOneScore[1], 10))
                formErrorMessage('No scores can be tied.');
            else if ((parseInt(setFiveScore[0], 10) != 25 && parseInt(setFiveScore[1], 10) != 25)) {
                if ((parseInt(setFiveScore[0], 10) >= 24 && parseInt(setFiveScore[1], 10) >= 24) && (Math.abs(parseInt(setFiveScore[0], 10) - parseInt(setFiveScore[1], 10)) != 2))
                    formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
                else if (parseInt(setFiveScore[0], 10) < 25 && parseInt(setFiveScore[1], 10) < 25)
                    formErrorMessage('One team MUST reach 25 in order to win a set.');
                else
                    getNewMatch(homeSets, awaySets);
            }
        }
        getNewMatch(homeSets, awaySets);  // If nothing is wrong with the 4th or 5th sets and it wasn't the special case of win by two (which was already delt with in those if statements), make a match and let the user know.
    } else {    // If the match is valid make a match and let the user know.
        getNewMatch(homeSets, awaySets);
    }

    // Once the match is made, clear all the input fields.
    document.querySelector('#homeTeam').value = '';
    document.querySelector('#awayTeam').value = '';
    document.querySelector('#setOne').value = '';
    document.querySelector('#setTwo').value = '';
    document.querySelector('#setThree').value = '';
    document.querySelector('#setFour').value = '';
    document.querySelector('#setFive').value = '';
}

// Called from createNewMatch() when the input is valid and a new match should be created.
function getNewMatch(homeSets, awaySets) {
    const newMatch = {
        home: document.querySelector('#homeTeam').value.toUpperCase() === 'USA' ? document.querySelector('#homeTeam').value.toUpperCase() : document.querySelector('#homeTeam').value.substring(0, 1).toUpperCase() + document.querySelector('#homeTeam').value.substring(1).toLowerCase(), // Make the team's first letter capitalized and the rest lowercase unless it is the USA in which case make the whole thing uppercase.
        away: document.querySelector('#awayTeam').value.toUpperCase() === 'USA' ? document.querySelector('#awayTeam').value.toUpperCase() : document.querySelector('#awayTeam').value.substring(0, 1).toUpperCase() + document.querySelector('#awayTeam').value.substring(1).toLowerCase(),
        setOne: document.querySelector('#setOne').value,
        setTwo: document.querySelector('#setTwo').value,
        setThree: document.querySelector('#setThree').value,
        setFour: document.querySelector('#setFour').value === '' ? document.querySelector('#setFour').value = null : document.querySelector('#setFour').value, // If setFour input is empty, make it null (to keep it consistent with other instances of empty 4th sets), if not assign the value input to it.
        setFive: document.querySelector('#setFive').value === '' ? document.querySelector('#setFive').value = null : document.querySelector('#setFive').value,
        homeSets: homeSets, // the amount of sets won by the home team. Passed into the function when called.
        awaySets: awaySets  // the amount of sets won by the away team. Passed into the function when called.
    };

    // Push the new match onto the matches array in localStorage then set localStorage to the updated matches array. 
    matches = JSON.parse(localStorage.getItem('matches'));
    matches.push(newMatch);
    localStorage.setItem('matches', JSON.stringify(matches));

    // Tells the user the match was added successfully.
    document.querySelector('#msg').classList.remove('text-danger');
    document.querySelector('#msg').classList.add('text-success');
    document.querySelector('#msg').innerHTML = 'Match Added.'
    setTimeout(function() {document.querySelector('#msg').innerHTML = ''}, 3000);
}

// Displays a specific message based off of the msg variable that tells the user was they did wrong.
function formErrorMessage(msg) {
    document.querySelector('#msg').classList.remove('text-success');
    document.querySelector('#msg').classList.add('text-danger');
    document.querySelector('#msg').innerHTML = msg;
    setTimeout(function() {document.querySelector('#msg').innerHTML = ''}, 3000);
}

// Clears localStorage to get rid of all of the matches that may have been added.
function clearStorage() {
    localStorage.clear();

    // This is required to allow pages to load properly after clearing storage rather than crashing on startup.
    fetch('standings.json')
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('standings', JSON.stringify(data));
    });
    
    fetch('matchStatistics.json')
    .then((res) => res.json())
    .then((data) => {
        matches = data;
        localStorage.setItem('matches', JSON.stringify(matches));
    });
}