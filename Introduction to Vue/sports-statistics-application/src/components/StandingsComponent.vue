<template>
<div class="container">
   <div id="main" class="card card-body">
      <form class="form-inline mb-3 align-self-lg-end">
         <input id="filter" type="text" class="form-control mr-2" placeholder="Filter" onkeyup="filterTeams();">
      </form>
      <h2 class="title text-center">Volleyball Nations League 2021 Standings</h2>
      <table class="table table-striped">
         <thead>
            <tr>
               <th scope="col" class ='text-center' @click="sort('ranking')">Ranking</th>
               <th scope="col" class ='text-center' @click="sort('team')">Team</th>
               <th scope="col" class ='text-center' @click="sort('totalMatches')">Total</th>
               <th scope="col" class ='text-center' @click="sort('wonMatches')"><span class='h5 d-block'>Matches:</span>Won</th>
               <th scope="col" class ='text-center' @click="sort('lostMatches')">Lost</th>
               <th scope="col" class ='text-center' @click="sort('points')">Points</th>
               <th scope="col" class='d-none d-lg-table-cell text-center' @click="sort('totalSets')">Total</th>
               <th scope="col" class='d-none d-lg-table-cell text-center' @click="sort('wonSets')"><span class='h5 d-block align-self-end'>Sets:</span>Won</th>
               <th scope="col" class='d-none d-lg-table-cell text-center' @click="sort('lostSets')">Lost</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('threeZero')">3-0</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('threeOne')">3-1</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('threeTwo')">3-2</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('twoThree')">2-3</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('oneThree')">1-3</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('zeroThree')">0-3</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('totalPoints')">Total</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('wonPoints')"><span class='h5 d-block'>Points:</span>Won</th>
               <th scope="col" class='d-none d-xl-table-cell text-center' @click="sort('lostPoints')">Lost</th>
            </tr>
         </thead>
         <tbody id="rows">
         </tbody>
      </table>
   </div>
</div>
</template>

<script>
export default {
  name: 'Standings',
  props: {
    
  },
  data() {
     return {
      sortedTeams: [],
      currentSortField: 'ranking',
      sortDirection: 'DSC'
     }
  },
  methods: {
   async fetchStandings() {
      const res = await fetch('http://localhost:5000/standings')
      const data = await res.json()
      return data
   },

   async fetchMatches() {
      const res = await fetch('http://localhost:5000/matches')
      const data = await res.json()
      return data
   },

   async getStandings() {
      let teams = await this.fetchStandings();
      let filledTeams = [];
      teams.forEach(team => {
         team.ranking = 0;
         team.totalMatches = 0;
         team.wonMatches = 0;
         team.lostMatches = 0;
         team.points = 0;
         team.totalSets = 0;
         team.wonSets = 0;
         team.lostSets = 0;
         team.threeZero = 0;
         team.threeOne = 0;
         team.threeTwo = 0;
         team.twoThree = 0;
         team.oneThree = 0;
         team.zeroThree = 0;
         team.totalPoints = 0;
         team.wonPoints = 0;
         team.lostPoints = 0;

         filledTeams.push(this.updateStandings(team));
      });

      await this.updateRankings(teams); // Because of the way updateRankings works, needs to be called once all the teams have their stats loaded


      teams.forEach(team => {
         let row = this.createRow(team);
         document.querySelector('#rows').appendChild(row);
      });

      // sortedTeams = teams;
      
      // (await Promise.all(filledTeams)).forEach(team => {
      //    setTimeout(() => {
      //       const res = fetch(`http://localhost:5000/standings/${team.id}`, {
      //          method: 'PATCH',
      //          headers: {
      //             'Content-type': 'application/json',
      //          },
      //          body: JSON.stringify(team)
      //       })
      //    }, 1000)
      // })      
   },

   async updateStandings(team) {
      let matches = await this.fetchMatches();
      matches.forEach(newMatch => {
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

      return team;
   },

   createRow(team) {
      let newRow = document.createElement('tr');
      newRow.setAttribute('scope', 'row');
      let newCell = document.createElement('td');
      newCell.appendChild(document.createTextNode(team.ranking));
      newCell.classList.add('text-center');
      newRow.appendChild(newCell);
      newCell = document.createElement('td');
      newCell.appendChild(this.getFlagsForStandings(team.team));
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
   },

   getFlagsForStandings(teamName) {
      let flag = document.createElement('img');
      flag.src = `../assets/${teamName}.png`;
      flag.style.width = '50px';
      flag.classList.add('d-none', 'd-sm-inline');
      flag.style.marginRight = '10px';

      return flag;
   },

   async updateRankings(teams) {
      teams.sort((a, b) => b.points - a.points === 0 ? (b.wonSets/b.lostSets) - (a.wonSets/a.lostSets) : b.points - a.points);
         // Sorts array by descending points (most points to least points). If points are tied then (higher) set quotient (wonSets/lostSets) determines winner.
      for (let i = 0; i < teams.length; i++) {
         teams[i].ranking = i+1;  // sets the ranking for each team based on their place in the newly sorted array of teams.
      }

      return teams;
   },

   sort(field) {
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
   },

   sortStandings() {
      document.querySelector('#rows').innerHTML = ''; // resets table.
      sortedTeams.forEach(team => {   // remakes table in order of the sort direction sortedTeams was changed to.
         let row = createRow(team);
         document.querySelector('#rows').appendChild(row);
      });
   },

   filterTeams() {
      let filterValue = document.querySelector('#filter').value;
      sortedTeams = allTeams.filter(team => (team.team.toLowerCase().indexOf(filterValue.toLowerCase()) === 0));
         // filters teams based on if input excatly matches any team names (not case sensitive).
      sort();
   }
  },
  mounted() {
   this.getStandings();
  }
}
</script>

<style scoped>

</style>
