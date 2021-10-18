function getMatches(){
    fetch('matchStatistics.json')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((match) => {
        let row = createRow(match);
        document.querySelector('#rows').appendChild(row);
      });
    })
  }

getMatches();

function createRow(match) {
    let newRow = document.createElement('tr');
    newRow.setAttribute('scope', 'row');
    let newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.home));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.away));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.homeSets));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.awaySets));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameOne));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameTwo));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameThree));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameFour));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.gameFive));
    newRow.appendChild(newCell);

    return newRow;
}

function changePage(newPage) {
    let id = "btn" + (pageNum+1);
    document.querySelector(`#${id}`).classList.add("btn-secondary");
    pageNum = newPage;
    getTenUsers();
}

function previousPage() {
    let id = "btn" + (pageNum+1);
    document.querySelector(`#${id}`).classList.add("btn-secondary");
    if (pageNum > 1)
        pageNum -= 1;
    getTenUsers();
}

function nextPage() {
    let id = "btn" + (pageNum+1);
    document.querySelector(`#${id}`).classList.add("btn-secondary");
    if (pageNum < userRecords.length/10)
        pageNum += 1;
    getTenUsers();
}