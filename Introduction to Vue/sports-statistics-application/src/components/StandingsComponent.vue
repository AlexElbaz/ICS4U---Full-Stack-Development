<template>
<div class="container">
   <div id="main" class="card card-body">
      <form class="form-inline mb-3 align-self-lg-end">
         <input id="filter" type="text" class="form-control mr-2" placeholder="Filter" @keyup="filterTeams();">
      </form>
      <h2 class="title text-center">{{title}}</h2>
      <table class="table table-striped">
         <thead>
            <tr>
               <th scope="col" class ='text-center' @click="sort('ranking')">Ranking</th>
               <th scope="col" class ='text-center' @click="sort('team')">Team</th>
               <th scope="col" class ='text-center' @click="sort('totalMatches')">Total</th>
               <th scope="col" class ='text-center' @click="sort('wonMatches')"><span class='h5 d-block'>Matches:</span>Won</th>
               <th scope="col" class ='text-center' @click="sort('lostMatches')">Lost</th>
               <th scope="col" class ='d-none d-sm-table-cell text-center' @click="sort('points')">Points</th>
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
         <tbody id="rows"></tbody> <!--Where standings data gets appended to. -->
      </table>
   </div>
</div>
</template>

<script>
export default {
   name: 'Standings',
   props: {
      title: String
   },
   data() {
      return {
         sortedTeams: [],
         allTeams: [],
         currentSortField: String,
         sortDirection: String,
      }
   },
   methods: {
      // Fetches standings array from the server
      async fetchStandings() {
         const res = await fetch('http://localhost:5000/standings')
         const data = await res.json()
         return data
      },

      // Fetches matches array from the server
      async fetchMatches() {
         const res = await fetch('http://localhost:5000/matches')
         const data = await res.json()
         return data
      },

      // Master function for creating the standings. Called upon mount of this path. Builds the standings using various other helper methods.
      async getStandings() {
         let teams = await this.fetchStandings();
         let unrankedTeams = [];
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
               // Reset all team attributes other than id each time the teams are built so that the attributes don't just get bigger and bigger each time the standings are built.

            unrankedTeams.push(this.updateStandings(team)); // Builds standings team by team by updating their stats, then pushes it to an array.
         });

         let rankedTeams = await this.updateRankings((await Promise.all(unrankedTeams))) // Because of the way updateRankings works, needs to be called once all the teams have their stats loaded. Must await Promise.all() to get the useable standings data, otherwise the array is all promises which are not useable.
      
         rankedTeams.forEach(team => {    // Goes through the most updated array of teams (rankedTeams), which has each team's stats as well as ranking, and puts that data on the page
            let row = this.createRow(team);
            document.querySelector('#rows').appendChild(row);
         });

         this.allTeams = rankedTeams;
         this.sortedTeams = rankedTeams;
            // Sets variables that require copies of the same data as rankedTeams for other functions (sorting and filtering)      
      },

      // Creates/updates the standings based on the matches in the database.
      async updateStandings(team) {
         (await this.fetchMatches()).forEach(newMatch => {
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

      // Creates a row of the standings table for a specific team passed in each call.
      createRow(team) {
         let newRow = document.createElement('tr');
         newRow.setAttribute('scope', 'row');
         let newCell = document.createElement('td');
         newCell.appendChild(document.createTextNode(team.ranking));
         newCell.classList.add('text-center');
         newRow.appendChild(newCell);
         newCell = document.createElement('td');
         newCell.appendChild(this.getFlag(team.team));
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
         newCell.classList.add('text-center', 'd-none', 'd-sm-table-cell');
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

      // Gets flags from assets folder and styles them to fit appropriately for the standings.
      getFlag(teamName) {
         let flag = document.createElement('img');
         flag.src = this.getFlagUrl(teamName); // Gets path to specific team's flag image
         flag.style.width = '50px';
         flag.classList.add('d-none', 'd-sm-inline');
         flag.style.marginRight = '10px';

         return flag;
      },

      // Gets paths for/preloads the team flags so that they can dispaly properly.
      getFlagUrl(flag) {
         let img = require.context('../assets/', false, /\.png$/);
         return img('./' + flag + ".png");
      },

      // Assigns/updates rankings based on points (volleyball ranking measure).
      async updateRankings(teams) {
         teams.sort((a, b) => b.points - a.points === 0 ? (b.wonSets/b.lostSets) - (a.wonSets/a.lostSets) : b.points - a.points);
            // Sorts array by descending points (most points to least points). If points are tied then (higher) set quotient (wonSets/lostSets) determines winner.
         for (let i = 0; i < teams.length; i++) {
            teams[i].ranking = i+1;  // sets the ranking for each team based on their place in the newly sorted array of teams.
         }

         return teams;
      },

      // Sorts the sortedTeams array based on a certain sorting direction and calls sortStandings() in order to actually update the page.
      sort(field) {
         if (field === undefined) {
            // when it is called from filter
            field = this.currentSortField;
         } else if (field === this.currentSortField) {
               this.sortDirection = this.sortDirection === 'ASC' ? 'DSC' : 'ASC';
               this.currentSortField = field;
         } else {
               this.sortDirection = 'ASC';
               this.currentSortField = field;  
         }
      
         if (this.sortDirection === 'ASC') {
            if (field === 'ranking')
               this.sortedTeams.sort((a, b) => b.ranking - a.ranking);
            else if (field === 'team')
               this.sortedTeams.sort((a, b) => a.team.localeCompare(b.team)); // Like compareTo() method, will end up sorting by alphabetical order
            else if (field === 'totalMatches')
               this.sortedTeams.sort((a, b) => a.totalMatches - b.totalMatches);
            else if (field === 'wonMatches')
               this.sortedTeams.sort((a, b) => a.wonMatches - b.wonMatches);
            else if (field === 'lostMatches')
               this.sortedTeams.sort((a, b) => a.lostMatches - b.lostMatches);
            else if (field === 'points')
               this.sortedTeams.sort((a, b) => a.points - b.points === 0 ? (a.wonSets/a.lostSets) - (b.wonSets/b.lostSets) : a.points - b.points); // If points are tied then (higher) set quotient (wonSets/lostSets) determines winner.
            else if (field === 'totalSets')
               this.sortedTeams.sort((a, b) => a.totalSets - b.totalSets);
            else if (field === 'wonSets')
               this.sortedTeams.sort((a, b) => a.wonSets - b.wonSets);
            else if (field === 'lostSets')
               this.sortedTeams.sort((a, b) => a.lostSets - b.lostSets);
            else if (field === 'threeZero')
               this.sortedTeams.sort((a, b) => a.threeZero - b.threeZero);
            else if (field === 'threeOne')
               this.sortedTeams.sort((a, b) => a.threeOne - b.threeOne);
            else if (field === 'threeTwo')
               this.sortedTeams.sort((a, b) => a.threeTwo - b.threeTwo);
            else if (field === 'twoThree')
               this.sortedTeams.sort((a, b) => a.twoThree - b.twoThree);
            else if (field === 'oneThree')
               this.sortedTeams.sort((a, b) => a.oneThree - b.oneThree);
            else if (field === 'zeroThree')
               this.sortedTeams.sort((a, b) => a.zeroThree - b.zeroThree);
            else if (field === 'totalPoints')
               this.sortedTeams.sort((a, b) => a.totalPoints - b.totalPoints);
            else if (field === 'wonPoints')
               this.sortedTeams.sort((a, b) => a.wonPoints - b.wonPoints);
            else if (field === 'lostPoints')
               this.sortedTeams.sort((a, b) => a.lostPoints - b.lostPoints);
         } else if (this.sortDirection === 'DSC') {
            if (field === 'ranking')
               this.sortedTeams.sort((a, b) => a.ranking - b.ranking);
            else if (field === 'team')
               this.sortedTeams.sort((a, b) => b.team.localeCompare(a.team));
            else if (field === 'totalMatches')
               this.sortedTeams.sort((a, b) => b.totalMatches - a.totalMatches);
            else if (field === 'wonMatches')
               this.sortedTeams.sort((a, b) => b.wonMatches - a.wonMatches);
            else if (field === 'lostMatches')
               this.sortedTeams.sort((a, b) => b.lostMatches - a.lostMatches);
            else if (field === 'points')
               this.sortedTeams.sort((a, b) => b.points - a.points === 0 ? (b.wonSets/b.lostSets) - (a.wonSets/a.lostSets) : b.points - a.points); // If points are tied then (higher) set quotient (wonSets/lostSets) determines winner.
            else if (field === 'totalSets')
               this.sortedTeams.sort((a, b) => b.totalSets - a.totalSets);
            else if (field === 'wonSets')
               this.sortedTeams.sort((a, b) => b.wonSets - a.wonSets);
            else if (field === 'lostSets')
               this.sortedTeams.sort((a, b) => b.lostSets - a.lostSets);
            else if (field === 'threeZero')
               this.sortedTeams.sort((a, b) => b.threeZero - a.threeZero);
            else if (field === 'threeOne')
               this.sortedTeams.sort((a, b) => b.threeOne - a.threeOne);
            else if (field === 'threeTwo')
               this.sortedTeams.sort((a, b) => b.threeTwo - a.threeTwo);
            else if (field === 'twoThree')
               this.sortedTeams.sort((a, b) => b.twoThree - a.twoThree);
            else if (field === 'oneThree')
               this.sortedTeams.sort((a, b) => b.oneThree - a.oneThree);
            else if (field === 'zeroThree')
               this.sortedTeams.sort((a, b) => b.zeroThree - a.zeroThree);
            else if (field === 'totalPoints')
               this.sortedTeams.sort((a, b) => b.totalPoints - a.totalPoints);
            else if (field === 'wonPoints')
               this.sortedTeams.sort((a, b) => b.wonPoints - a.wonPoints);
            else if (field === 'lostPoints')
               this.sortedTeams.sort((a, b) => b.lostPoints - a.lostPoints);
         }

         this.sortStandings();
      },

      // Remakes the table based on a specific sort direction. Executed by the sort(field) method.
      sortStandings() {
         document.querySelector('#rows').innerHTML = ''; // resets table.
         this.sortedTeams.forEach(team => {   // remakes table in order of the sort direction sortedTeams was changed to.
            let row = this.createRow(team);
            document.querySelector('#rows').appendChild(row);
         });
      },

      // Filters the teams by name based on an input in the filter input area.
      filterTeams() {
         let filterValue = document.querySelector('#filter').value;
         this.sortedTeams = this.allTeams.filter(team => (team.team.toLowerCase().indexOf(filterValue.toLowerCase()) === 0));
            // filters teams based on if input excatly matches (the beginning of) any team names (not case sensitive).
         this.sort();
      }
   },
   mounted() {
   this.getStandings();
   this.currentSortField = 'ranking';
   this.sortDirection = 'DSC'
   }
}
</script>

<style scoped>

</style>
