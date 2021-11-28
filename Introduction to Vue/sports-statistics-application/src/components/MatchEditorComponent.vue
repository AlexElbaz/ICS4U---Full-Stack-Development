<template>
<div class="container card p-4">
  <h2 class="title text-center mb-4">{{title}}</h2>
  <form class="row g-3">
    <div class="col-md-6">
      <label for="" class="form-label">Home Team:</label>
      <input type="text" class="form-control" id="homeTeam" placeholder="Home Team">
    </div>
    <div class="col-md-6">
      <label for="" class="form-label">Away Team:</label>
      <input type="text" class="form-control" id="awayTeam" placeholder="Away Team">
    </div>
    <div class="col-4">
      <label for="" class="form-label">Set 1 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setOne" placeholder="xx-xx">
    </div>
    <div class="col-4">
      <label for="inputAddress2" class="form-label">Set 2 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setTwo" placeholder="xx-xx">
    </div>
    <div class="col-4">
      <label for="inputAddress2" class="form-label">Set 3 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setThree" placeholder="xx-xx">
    </div>
    <div class="col-6">
      <label for="inputAddress2" class="form-label">(OPTIONAL) Set 4 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setFour" placeholder="xx-xx">
    </div>
    <div class="col-6">
      <label for="inputAddress2" class="form-label">(OPTIONAL) Set 5 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setFive" placeholder="xx-xx">
    </div>
    <div class="col-12 text-center">
      <button type="button" class="btn btn-lg btn-primary me-1" @click="createNewMatch()">Add New Match</button>
    </div>
    <div class="col-6 col-md-5 col-lg-4 col-xl-3 mx-auto text-center">
      <label for="inputAddress2" class="form-label">Delete Match (Insert Match id):</label>
      <input type="text" class="form-control" id="deleteMatch" placeholder="Match id">
      <button type="button" class="btn btn-lg btn-primary ms-1 mt-3" @click="deleteMatch()">Delete Match</button>  
    </div>
  </form>
  <p class="lead text-center mt-3" id="msg"></p>
    <!-- Where messages about successes/failures of editing matches are appended to. -->
</div>
</template>

<script>
export default {
  name: 'MatchEditor',
  props: {
    title: String
  },
  data() {
    return {
      startingMatches: String,
      errorWithInput: Boolean,
      errorMsg: String
    }
  },
  methods: {
  // Fetches matches array from the server
  async fetchMatches() {
    const res = await fetch('http://localhost:5000/matches')
    const data = await res.json()
    return data
  },

  // Called when Add New Match button is pressed with adequate information in the form. Creates a new match based on the inputs in the form.
  createNewMatch() {
    // Splits the scores from each set. Used to determine whether they are valid in future if statements
    let setOneScore = document.querySelector('#setOne').value.split('-');
    let setTwoScore = document.querySelector('#setTwo').value.split('-');
    let setThreeScore = document.querySelector('#setThree').value.split('-');
    let setFourScore = document.querySelector('#setFour').value.split('-');
    let setFiveScore = document.querySelector('#setFive').value.split('-');


    // Figures out who won what set in order to determine some stats to put in the new match as well as limit some inputs
    let homeSets = 0;
    let awaySets = 0;

    setOneScore[0] > setOneScore[1] ? homeSets++ : awaySets++;
    setTwoScore[0] > setTwoScore[1] ? homeSets++ : awaySets++;
    setThreeScore[0] > setThreeScore[1] ? homeSets++ : awaySets++;
    if (document.querySelector('#setFour').value != '') {
      setFourScore[0] > setFourScore[1] ? homeSets++ : awaySets++;

      if (document.querySelector('#setFive').value != '')
        setFiveScore[0] > setFiveScore[1] ? homeSets++ : awaySets++;
    }



    // Limits the user's inputs and displays an error message if they do it wrong so that they cannot mess up the future program executions.

    // Checks that there are the right amount of sets in a match
    if (homeSets > 3 || awaySets > 3)   // If home or away has won 4 sets (meaning that the user input more sets than they possible), the match should be over, so no 4th set should exist. As such, don't make a match and let the user know.
      this.formErrorMessage('There cannot be more sets if a team has already won 3 sets.');


    // Checks that all the inputs for each set are formatted correctly/are valid, and makes sure that optional fields (sets 4 and 5) are handled properly.
    if (document.querySelector('#homeTeam').value === '' || document.querySelector('#awayTeam').value === '' || document.querySelector('#setOne').value === '' || document.querySelector('#setTwo').value === '' || document.querySelector('#setThree').value === '') // If any of the required fields are not filled out, don't make a match and let the user know.
        this.formErrorMessage('You must fill out all the required fields (all of those which do not have OPTIONAL on them).');
    else if (setOneScore.length != 2 || isNaN(setOneScore[0]) || isNaN(setOneScore[1])) // If the score for setOne is not valid/formatted correctly, don't make a match and let the user know.
        this.formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
    else if (setTwoScore.length != 2 || isNaN(setTwoScore[0]) || isNaN(setTwoScore[1]))
        this.formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
    else if (setThreeScore.length != 2 || isNaN(setThreeScore[0]) || isNaN(setThreeScore[1]))
        this.formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
    else if (parseInt(setOneScore[0], 10) === parseInt(setOneScore[1], 10)) // If setOne's score is tied, don't make a match and let the user know.
        this.formErrorMessage('No scores can be tied.');
    else if (parseInt(setTwoScore[0], 10) === parseInt(setTwoScore[1], 10))
        this.formErrorMessage('No scores can be tied.');
    else if (parseInt(setThreeScore[0], 10) === parseInt(setThreeScore[1], 10))
        this.formErrorMessage('No scores can be tied.');
    else if (document.querySelector('#setFour').value === '' && document.querySelector('#setFive').value != '') // If the user put in a score for set 5 but not one for set 4, don't make a match and let them know.
      this.formErrorMessage('A score for set 5 cannot exist without a score for set 4.');
    else if (document.querySelector('#setFour').value != '') {  // If set 4 exists, do input limiting checks for it
      if (setFourScore.length != 2 || isNaN(setFourScore[0]) || isNaN(setFourScore[1]))
          this.formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
      else if (parseInt(setFourScore[0], 10) === parseInt(setFourScore[1], 10))
          this.formErrorMessage('No scores can be tied.');

      if (document.querySelector('#setFive').value != '') { // If set 5 exists, do input limiting checks for it
        if (setFiveScore.length != 2 || isNaN(setFiveScore[0]) || isNaN(setFiveScore[1]))
          this.formErrorMessage('All scores MUST be of the format [homeScore]-[awayScore]. Eg. 25-10.');
        else if (parseInt(setFiveScore[0], 10) === parseInt(setFiveScore[1], 10))
          this.formErrorMessage('No scores can be tied.');
      }
    }


    // Checks special cases for each set (win by two and if there is a winner to each set)
    if ((parseInt(setOneScore[0], 10) >= 24 && parseInt(setOneScore[1], 10) >= 24) && (Math.abs(parseInt(setOneScore[0], 10) - parseInt(setOneScore[1], 10)) != 2)) // If both of the scores are above 24 (the only situation where neither of the scores being 25 is possibly acceptable (win by two case)) but the difference between them is not two (meaning the set was not won by two and as such is invalid), don't make a match and let the user know.
        this.formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
    else if (parseInt(setOneScore[0], 10) < 25 && parseInt(setOneScore[1], 10) < 25) // If both scores are less than 25, don't make a match and let the user know.
        this.formErrorMessage('One team MUST reach 25 in order to win a set.');
    else  {  // Otherwise (meaning that the setOne was either a valid win by two or not a win by two at all), check setTwo.
      if ((parseInt(setTwoScore[0], 10) >= 24 && parseInt(setTwoScore[1], 10) >= 24) && (Math.abs(parseInt(setTwoScore[0], 10) - parseInt(setTwoScore[1], 10)) != 2))
        this.formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
      else if (parseInt(setTwoScore[0], 10) < 25 && parseInt(setTwoScore[1], 10) < 25)
          this.formErrorMessage('One team MUST reach 25 in order to win a set.');
      else {  // Otherwise (meaning that the setTwo was either a valid win by two or not a win by two at all), check setThree.
        if ((parseInt(setThreeScore[0], 10) >= 24 && parseInt(setThreeScore[1], 10) >= 24) && (Math.abs(parseInt(setThreeScore[0], 10) - parseInt(setThreeScore[1], 10)) != 2))
          this.formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
        else if (parseInt(setThreeScore[0], 10) < 25 && parseInt(setThreeScore[1], 10) < 25)
          this.formErrorMessage('One team MUST reach 25 in order to win a set.');
        else {  // Otherwise (meaning that the setThree was either a valid win by two or not a win by two at all), check setFour if there is one.
          if (document.querySelector('#setFour').value != '') {
            if ((parseInt(setFourScore[0], 10) >= 24 && parseInt(setFourScore[1], 10) >= 24) && (Math.abs(parseInt(setFourScore[0], 10) - parseInt(setFourScore[1], 10)) != 2))
              this.formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
            else if (parseInt(setFourScore[0], 10) < 25 && parseInt(setFourScore[1], 10) < 25)
                this.formErrorMessage('One team MUST reach 25 in order to win a set.');
            else {  // Otherwise (meaning that the setFour was either a valid win by two or not a win by two at all), check setFive if there is one.
              if (document.querySelector('#setFive').value != '') {
                if ((parseInt(setFiveScore[0], 10) >= 24 && parseInt(setFiveScore[1], 10) >= 24) && (Math.abs(parseInt(setFiveScore[0], 10) - parseInt(setFiveScore[1], 10)) != 2))
                  this.formErrorMessage('Scores cannot be above 25 unless they are 2 apart.');
                else if (parseInt(setFiveScore[0], 10) < 25 && parseInt(setFiveScore[1], 10) < 25)
                  this.formErrorMessage('One team MUST reach 25 in order to win a set.');
                else  //  Otherwise (meaning that the setFive was either a valid win by two or not a win by two at all), all sets are valid so make a new match and let the user know.
                  this.getNewMatch(homeSets, awaySets);
              } else  // If there is no setFive, we know sets 1-4 are valid, so make a match and let the user know.
                this.getNewMatch(homeSets, awaySets);
            }
          } else // If there is no setFour, we know sets 1-3 are valid, so make a match and let the user know.
              this.getNewMatch(homeSets, awaySets);
        }
      }
    }

    // Once the match is made, clear all the input fields.
    document.querySelector('#homeTeam').value = '';
    document.querySelector('#awayTeam').value = '';
    document.querySelector('#setOne').value = '';
    document.querySelector('#setTwo').value = '';
    document.querySelector('#setThree').value = '';
    document.querySelector('#setFour').value = '';
    document.querySelector('#setFive').value = '';
  },

  // Called from createNewMatch() when the input is valid and a new match should be created.
  getNewMatch(homeSets, awaySets) {
    if (!this.errorWithInput) {
      const newMatch = {
          home: document.querySelector('#homeTeam').value.toUpperCase() === 'USA' ? document.querySelector('#homeTeam').value.toUpperCase() : document.querySelector('#homeTeam').value.substring(0, 1).toUpperCase() + document.querySelector('#homeTeam').value.substring(1).toLowerCase(), // Make the team's first letter capitalized and the rest lowercase unless it is the USA in which case make the whole thing uppercase.
          away: document.querySelector('#awayTeam').value.toUpperCase() === 'USA' ? document.querySelector('#awayTeam').value.toUpperCase() : document.querySelector('#awayTeam').value.substring(0, 1).toUpperCase() + document.querySelector('#awayTeam').value.substring(1).toLowerCase(),
          setOne: document.querySelector('#setOne').value,
          setTwo: document.querySelector('#setTwo').value,
          setThree: document.querySelector('#setThree').value,
          setFour: document.querySelector('#setFour').value === '' ? document.querySelector('#setFour').value = null : document.querySelector('#setFour').value, // If setFour input is empty, make it null (to keep it consistent with other instances of empty 4th sets), if not assign the value input to it.
          setFive: document.querySelector('#setFive').value === '' ? document.querySelector('#setFive').value = null : document.querySelector('#setFive').value, // ^^ Same thing.
          homeSets: homeSets, // the amount of sets won by the home team. Passed into the function when called.
          awaySets: awaySets  // the amount of sets won by the away team. Passed into the function when called.
      };

      // POST the new match to the database json (db.json).
      this.postMatch(newMatch);
    } else
      this.formErrorMessage(this.errorMsg);
    

  },

  // Posts the new match passed in into the database and lets the user know if it was successful or not. Called from getNewMatch() where newMatch is created.
  async postMatch(newMatch) {
    const res = await fetch('http://localhost:5000/matches', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newMatch)
    });

    res.status === 201 ? this.matchesEditedMsg('Match Added.') : alert('Error Posting Match.'); // After POST is complete, check status and let the user know whether it was successful or not
  },

  // Displays a specific message based off of the msg variable telling the user was they did wrong.
  formErrorMessage(msg) {
    this.errorWithInput = true; // Sets errorWithInput to true making it so that if getNewMatch() is called from createNewMatch() it will not run (as this function running beforehand means there is an error with the input, so no match should be created)
    this.errorMsg = msg; // Sets errorMsg to msg so that if getNewMatch() is called when there is already an input error it can give the user a specific error with their input.
    document.querySelector('#msg').classList.remove('text-success');
    document.querySelector('#msg').classList.add('text-danger');
    document.querySelector('#msg').innerHTML = msg;
    setTimeout(function() {document.querySelector('#msg').innerHTML = ''}, 3000);
  },

  // Deletes a match from the database determined by the inputted id and lets the user know if it was successful or not. Called when Delete Match button is pressed.
  async deleteMatch() {
    let matchId = document.querySelector("#deleteMatch").value;
    if (isNaN(matchId)) {   // Make sure matchId is strictly a number (response status will deal with if the number is not an existing id)
      this.formErrorMessage(`Please enter a valid id (MUST be a number)`)
    } else {
        const res = await fetch(`http://localhost:5000/matches/${matchId}`, {
          method: 'DELETE'
      });

      res.status === 200 ? this.matchesEditedMsg(`Match ${matchId} Deleted.`) : alert('Error Deleting Match (id may be invalid).'); // After DELETE is complete, check status and let the user know whether it was successful or not
    }
    document.querySelector('#deleteMatch').value = ''; // Clear #deleteMatch input field
  },

  // Displays a message (based on what is passed into msg) when the matches array in the database is successfully edited.
  matchesEditedMsg(msg) {
      document.querySelector('#msg').classList.remove('text-danger');
      document.querySelector('#msg').classList.add('text-success'); 
      document.querySelector('#msg').innerHTML = msg; 
      setTimeout(function() {document.querySelector('#msg').innerHTML = ''}, 3000);
  }
  },
  mounted() {
    this.startingMatches = 120;
    this.errorWithInput = false;
    this.errorMsg = '';
  }
}
</script>

<style scoped>

</style>