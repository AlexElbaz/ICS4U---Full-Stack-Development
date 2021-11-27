<template>
<div class="container">
  <div id="main" class="card card-body">
      <h2 class="title text-center mb-5">{{title}}</h2>
      <table id="rows" class="table table-borderless text-light">
      </table>
      <div class="btn-toolbar align-self-center">
        <button type="button" class="btn btn-secondary" id="btnPrev" @click="previousPage()"><i class="bi bi-arrow-left"></i></button>
        <div class="btn-group" id="pageButtons" role="group">
          <div v-for="i in totalPages" :key="i"> <!-- Rather than normal v-for which is forEach like (goes through a collection) this just loops through the div as many times as the Number totalPages dicates (acts more like a normal for loop). Allows creation of a specific amount of buttons depending on how many pages are required. -->
            <button type="button" class="btn btn-secondary d-none d-md-inline" :id="'btn' + i" @click="changePage(i)">{{i}}</button>
          </div>
        </div>
        <button type="button" class="btn btn-secondary" id="btnNext" @click="nextPage()"><i class="bi bi-arrow-right"></i></button>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Matches',
  props: {
    title: String
  },
  data() {
    return {
      matches: [],
      validTeams: [],
      pageNum: Number,
      startingMatches: Number,
      totalPages: Number
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

    // Master function for creating the matches pages. Called upon mount of this path.
   async getMatches() {
    let allMatches = await this.fetchMatches();
    allMatches.reverse(); // To make JSON in order from most recent to least recent match.
    allMatches.forEach(match => {
        let body = this.createMatch(match);
        this.matches.push(body);
    });

    this.displayTenMatches(); // Makes it so only 10 matches display to the screen at a time (matches displayed depend on pageNum).
  },

  // Goes through the matches array and only displays the 10 matches that are supposed to be displayed on that given page. 
  displayTenMatches() {
    document.querySelector(`#btn${this.pageNum}`).classList.add("active"); // Makes button of current page darker.

    for (let i = 0; i < this.matches.length; i++) {
      if (i >= (this.pageNum - 1) * 10 && i < (this.pageNum) * 10)
        document.querySelector('#rows').appendChild(this.matches[i]);
    }
  },

  // Creates match elements based on the specific match passed in each call of the function.
  createMatch(match) {
    let newBody = document.createElement('tbody');
    newBody.setAttribute('scope', 'body');
    newBody.classList.add('card', 'w-75', 'mx-auto', 'mb-3', 'position-relative');
    newBody.style.backgroundColor = '#c0c5c9';
    newBody.style.border = 0;


    let firstNewRow = document.createElement('div');
    firstNewRow.classList.add('card-title','mx-md-5', 'mt-4', 'mb-0', 'text-center');
    firstNewRow.setAttribute('scope', 'row');
    
    let newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.id));
    newCell.classList.add('position-absolute', 'top-0', 'start-0', 'small'); // Position classes make it so that id appears in the top left of the match card.
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(this.getFlag(match.home));
    newCell.appendChild(document.createTextNode(match.home));
    newCell.classList.add('me-md-3', 'd-inline', 'h3');
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.homeSets));
    newCell.classList.add('ms-md-3', 'me-1', 'd-inline', 'h5');
    if (match.homeSets > match.awaySets) // Used to make the team who won's sets element red so that it is easy to see who won the match.
        newCell.classList.add('text-danger'); 
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(' : '));
    newCell.classList.add('d-inline', 'h5');
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.awaySets));
    newCell.classList.add('ms-1', 'me-md-3', 'd-inline', 'h5');
    if (match.awaySets > match.homeSets) // Used to make the team who won's sets element red so that it is easy to see who won the match.
        newCell.classList.add('text-danger');
    firstNewRow.appendChild(newCell);

    newCell = document.createElement('td');
    newCell.appendChild(document.createTextNode(match.away));
    newCell.appendChild(this.getFlag(match.away));
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
            newCell.classList.add('mx-md-2', 'd-sm-inline', 'd-block', 'text-center'); // Extra classes & edits to them (d-sm-inline, d-block, text-center) are to make it so that when the page gets narrow, the last game moves to an entirely new row rather than half spilling over (looks bad). Only need to do for game 5, the rest are fine on one row no matter screen width. Note, with the way other elements/classes are set up, text-center doesn't effect this element until it is on it's own line.
            secondNewRow.appendChild(newCell);
        }
    }

    newBody.appendChild(secondNewRow)

    return newBody;
  },

  // Gets flags from assets folder and styles them to fit appropriately for the match elements.
  getFlag(teamName) {
    let flag = document.createElement('img');
    if (this.validTeams.includes(teamName))  // If the team passed in is valid (it is one of the teams that played in this season) then grab the image for its flag.
        flag.src = this.getFlagUrl(teamName); // Gets path to specific team's flag image
    else    // If the team passed in is not a valid team, grab the generic flag image (question mark flag).
        flag.src = this.getUnknownFlagUrl(); // Gets path to question mark flag image
    flag.classList.add('d-none', 'd-xl-inline');
    flag.style.width = '15%';
    flag.style.marginLeft = '10px';
    flag.style.marginRight = '10px';

    return flag;
  },

  // Gets paths for/preloads the team flags so that they can dispaly properly.
  getFlagUrl(flag) {
    let img = require.context('../assets/', false, /\.png$/);
    return img('./' + flag + ".png");
  },

  // Gets path for/preloads the question mark flag so it can dispaly properly.
  getUnknownFlagUrl() {
    let img = require.context('../assets/', false, /\.jpg$/);
    return img('./' + 'questionMark' + ".jpg");
  },

  // Called when one of the page buttons is pressed. Changes the page to a new set of 10 matches depending on newPage (the page the user wants to go to). 
  changePage(newPage) {
    document.querySelector(`#btn${this.pageNum}`).classList.remove("active");
    this.pageNum = newPage;
    document.querySelector('#rows').innerHTML = '';
    this.displayTenMatches();
  },

  // Called when #btnPrev is pressed. Changes the displayed matches to a new set 10 of matches from the page 1 before the current page.
  previousPage() {
    if (this.pageNum > 1) {  // Stops user from going below page 1 (which doesn't exist).
        document.querySelector(`#btn${this.pageNum}`).classList.remove("active");
        this.pageNum -= 1;
        document.querySelector('#rows').innerHTML = '';
        this.displayTenMatches();
    }
  },

  // Called when #btnNext is pressed. Changes the displayed matches to a new set 10 of matches from the page 1 after the current page.
  nextPage() {
    if (this.pageNum < Math.ceil(this.matches.length/10)) {  // Stops user from going to a page higher than would exist based on the amount of matches in matches array (i.e. if there are 120 matches, there are 12 pages. This stops the user from attempting to go to the 13th page which doesn't exist (until new matches are added)).
        document.querySelector(`#btn${this.pageNum}`).classList.remove("active");
        this.pageNum += 1;
        document.querySelector('#rows').innerHTML = '';
        this.displayTenMatches();
    }
  },

  // Finds the first and last pagination buttons and makes it so that they display on all screen sizes (rather than disappearing on medium screen width like the rest of the pagination buttons).
  async editEndButtons() {
    document.querySelector('#btn1').classList.remove('d-none', 'd-md-inline');
    document.querySelector(`#btn${this.totalPages}`).classList.remove('d-none', 'd-md-inline');
  },

  // Goes through standings array and gets the teams that played this season to populate an array of all valid teams.
  async getValidTeams() {
    (await this.fetchStandings()).forEach(team => this.validTeams.push(team.team));
  }
  },
  async mounted() {
    this.pageNum = 1;
    this.startingMatches = 120;
    this.totalPages = Math.ceil((await this.fetchMatches()).length/10); // Formula to find how many pages will be needed for the amount of matches in the database.
    this.getValidTeams();
    this.$nextTick(() => {  // Everything isn't fully rendered by the time mounted is called (which causes errors when the functions inside are called), so this.nextTick(() => {}) effectively creates a buffer so that everything can render before the functions inside it are called (avoids errors).
      this.getMatches();
      this.editEndButtons();
    });
  },
}
</script>

<style scoped>

</style>