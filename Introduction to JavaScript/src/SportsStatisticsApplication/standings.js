function getStandings(){
    fetch('standings.json')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((team) => {
        let row = createRow(team);
        document.querySelector('#rows').appendChild(row);
      });
    })
  }

getStandings();

function createRow(stat) {
    let newRow = document.createElement('tr');
    newRow.setAttribute('scope', 'row');
    let newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(stat.ranking));
    newRow.appendChild(newCell);
    newCell = document.createElement('td');
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