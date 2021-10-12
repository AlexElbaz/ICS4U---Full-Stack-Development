const allTeams = [
   { name: 'Tampa Bay', wins: 100, losses: 62, GB: 0 },
   { name: 'New York', wins: 92, losses: 70, GB: 8.0 },
   { name: 'Boston', wins: 92, losses: 70, GB: 8.0 },
   { name: 'Toronto', wins: 91, losses: 71, GB: 9.0 },
   { name: 'Baltimore', wins: 52, losses: 110, GB: 48.0 }
];


let teams = allTeams;   
   // So that now you can edit (namely filter) the teams array without worrying about losing data because the original will always be stored in the allTeams master array.

let currentSortField = 'GB';
let sortDirection = 'ASC';


function createStandings() {
   document.querySelector('#rows').innerHTML = '';
   teams.forEach(team => { let row = createRow(team); document.querySelector('#rows').appendChild(row); });
}


function createRow(team) {
   let newRow = document.createElement('tr');
   newRow.setAttribute('scope', 'row');
   let newCell = document.createElement('td');
   newCell.appendChild(document.createTextNode(team.name));
   newRow.appendChild(newCell);
   newCell = document.createElement('td');
   newCell.appendChild(document.createTextNode(team.wins));
   newRow.appendChild(newCell);
   newCell = document.createElement('td');
   newCell.appendChild(document.createTextNode(team.losses));
   newRow.appendChild(newCell);
   newCell = document.createElement('td');
   newCell.appendChild(document.createTextNode(team.GB));
   newRow.appendChild(newCell);

   return newRow;
}


function sort(field) {
   if (field === undefined) {
      // when it is called from filter
      field = currentSortField;
   } else if (field === currentSortField) {
      sortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
      currentSortField = field;
   } else {
      sortDirection = 'ASC';
      currentSortField = field;  
   }


   if (sortDirection === 'ASC') {
      if (field === 'team')
         teams.sort((a, b) => a.name.localeCompare(b.name));
      else if (field === 'wins')
         teams.sort((a, b) => a.wins - b.wins);
      else if (field === 'losses')
         teams.sort((a, b) => a.losses - b.losses);
      else if (field === 'GB')
         teams.sort((a, b) => a.GB - b.GB);
   } else if (sortDirection === 'DESC') {
      if (field === 'team')
         teams.sort((a, b) => b.name.localeCompare(a.name));
      else if (field === 'wins')
         teams.sort((a, b) => b.wins - a.wins);
      else if (field === 'losses')
         teams.sort((a, b) => b.losses - a.losses);
      if (field === 'GB')
         teams.sort((a, b) => b.GB - a.GB);
   }
   createStandings();
}


function filterTeams() {
   let filterValue = document.querySelector('#filter').value;
   teams = allTeams.filter(team => (team.name.indexOf(filterValue) >= 0));
   sort();  // field variable in sort will be undefined, but JS is fine with that.
}


createStandings();