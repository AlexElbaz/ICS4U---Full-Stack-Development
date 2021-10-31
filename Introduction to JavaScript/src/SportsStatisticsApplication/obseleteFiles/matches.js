let matches = [];
let validTeams = ['Brazil', 'Poland', 'Slovenia', 'France', 'Russia', 'Serbia', 'USA', 'Canada', 'Argentina', 'Italy', 'Japan', 'Iran', 'Germany', 'Netherlands', 'Bulgaria', 'Australia'];
let pageNum = 1;
let totalPages = 12;

function createButtonIfStorage() {
    if (localStorage.getItem("newMatches") != null) {
        let newButton = document.createElement('button');
        newButton.setAttribute('type', 'button');
        newButton.setAttribute('id', 'btn13');
        newButton.setAttribute('onclick', 'changePage(13)');
        newButton.innerHTML = '13';
        newButton.classList.add('btn', 'btn-secondary');
        document.querySelector('#pagination').appendChild(newButton);
    }
}

function getTenMatches() {
    document.querySelector(`#btn${pageNum}`).classList.add("active");
    fetch('matchStatistics.json')
    .then((res) => res.json())
    .then((data) => {
        if (localStorage.getItem("newMatches") != null)
            JSON.parse(localStorage.getItem("newMatches")).forEach(newMatch => data.push(newMatch));
        data.forEach((match) => {
            let body = createBody(match);
            matches.push(body);
        });
        matches.reverse(); // To make JSON in order from most recent to least recent.

        for (let i = 0; i < matches.length; i++) {
            if (i >= (pageNum - 1) * 10 && i < (pageNum) * 10)
                document.querySelector('#rows').appendChild(matches[i]);
        }
    })
}

function createBody(match) {
    let newBody = document.createElement('tbody');
    newBody.setAttribute('scope', 'body');
    newBody.classList.add('card', 'w-75', 'mx-auto', 'mb-3', 'bg-tertiary');


    let firstNewRow = document.createElement('div');
    firstNewRow.classList.add('card-title','mx-5', 'px-5', 'mt-4', 'mb-0', 'mx-auto'); // FINISH!!!!!!!!!! NEED TO MAKE IT SO THAT COLONS LINE UP RATHER THAN ACTUALLY BEING CENTERED!!!
    firstNewRow.setAttribute('scope', 'row');

    let newCell = document.createElement('td');
    newCell.appendChild(getFlag(match.home));
    newCell.appendChild(document.createTextNode(match.home));
    newCell.classList.add('me-3', 'd-inline', 'h3', 'align-self-end');
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.homeSets));
    newCell.classList.add('ms-3', 'me-1', 'd-inline', 'h5', 'align-self-end');
    if (match.homeSets > match.awaySets)
        newCell.classList.add('text-danger')
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(' : '));
    newCell.classList.add('d-inline', 'h5', 'align-self-center');
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.awaySets));
    newCell.classList.add('ms-1', 'me-3', 'd-inline', 'h5', 'align-self-start');
    if (match.awaySets > match.homeSets)
        newCell.classList.add('text-danger')
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.away));
    newCell.appendChild(getFlag(match.away));
    newCell.classList.add('ms-3', 'd-inline', 'h3', 'align-self-start');
    firstNewRow.appendChild(newCell);

    newBody.appendChild(firstNewRow);
    

    let secondNewRow = document.createElement('div');
    secondNewRow.setAttribute('scope', 'row');
    secondNewRow.classList.add('card-body', 'align-self-center', 'mb-2');

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameOne));
    newCell.classList.add('mx-2', 'd-inline');
    secondNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameTwo));
    newCell.classList.add('mx-2', 'd-inline');
    secondNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameThree));
    newCell.classList.add('mx-2', 'd-inline');
    secondNewRow.appendChild(newCell);

    if (match.gameFour != null) {
        newCell = document.createElement('td');
        newCell.appendChild(document.createTextNode(match.gameFour));
        newCell.classList.add('mx-2', 'd-inline');
        secondNewRow.appendChild(newCell);

        if (match.gameFive != null) {
            newCell = document.createElement('td');
            newCell.appendChild(document.createTextNode(match.gameFive));
            newCell.classList.add('mx-2', 'd-inline');
            secondNewRow.appendChild(newCell);
        }
    }

    newBody.appendChild(secondNewRow)

    return newBody;
}

function getFlag(team) {
    let flag = document.createElement('img');
    if (validTeams.includes(team))
        flag.src = `imgs/${team}.png`;
    else
        flag.src = `imgs/questionMark.jpg`;
    flag.style.width = '100px';
    flag.style.marginLeft = '10px';
    flag.style.marginRight = '10px';

    return flag;
}

function changePage(newPage) {
    document.querySelector(`#btn${pageNum}`).classList.remove("active");
    pageNum = newPage;
    matches = [];
    document.querySelector('#rows').innerHTML = '';
    getTenMatches();
}

function previousPage() {
    if (pageNum > 1) {
        document.querySelector(`#btn${pageNum}`).classList.remove("active");
        pageNum -= 1;
        matches = [];
        document.querySelector('#rows').innerHTML = '';
        getTenMatches();
    }
}

function nextPage() {
    if (pageNum < matches.length/10) {
        document.querySelector(`#btn${pageNum}`).classList.remove("active");
        pageNum += 1;
        matches = [];
        document.querySelector('#rows').innerHTML = '';
        getTenMatches();
    }
}

createButtonIfStorage();
getTenMatches();