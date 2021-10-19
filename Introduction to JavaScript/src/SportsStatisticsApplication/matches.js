let matches = [];
pageNum = 1;

function getTenMatches(){
    document.querySelector(`#btn${pageNum}`).classList.add("active");
    fetch('matchStatistics.json')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((match) => {
        let body = createRow(match);
        matches.push(body);
        if (matches.length > (pageNum - 1) * 10 && matches.length <= pageNum * 10)
            document.querySelector('#rows').appendChild(body);
      });
    })
}

function createRow(match) {
    let newBody = document.createElement('tbody');
    newBody.setAttribute('scope', 'body');
    newBody.classList.add('borderless', 'card');        // FINISH BORDERLESS!!!! CURRENTLY DOESN'T WORK (IN CSS)
    let firstNewRow = document.createElement('tr');
    firstNewRow.classList.add('card-title', 'align-self-center');
    firstNewRow.setAttribute('scope', 'row');
    let newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.home));
    firstNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.homeSets));
    firstNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.awaySets));
    firstNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.away));
    firstNewRow.appendChild(newCell);
    newBody.appendChild(firstNewRow);
    
    let secondNewRow = document.createElement('tr');
    secondNewRow.setAttribute('scope', 'row');
    secondNewRow.classList.add('card-body', 'align-self-center');
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameOne));
    secondNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameTwo));
    secondNewRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameThree));
    secondNewRow.appendChild(newCell);
    if (match.gameFour != null) {
        newCell = document.createElement('td');
        newCell.appendChild(document.createTextNode(match.gameFour));
        secondNewRow.appendChild(newCell);
        if (match.gameFive != null) {
            newCell = document.createElement('td');
            newCell.appendChild(document.createTextNode(match.gameFive));
            secondNewRow.appendChild(newCell);
        }
    }
    newBody.appendChild(secondNewRow)

    return newBody;
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


getTenMatches();