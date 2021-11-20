<template>
<div class="container card p-4">
  <h2 class="title text-center mb-4">Volleyball Nations League 2021 Add Matches</h2>
  <form class="row g-3">
    <div class="col-md-6">
      <label for="" class="form-label">Home Team:</label>
      <input type="text" class="form-control" id="homeTeam" placeholder="Home Team...">
    </div>
    <div class="col-md-6">
      <label for="" class="form-label">Away Team:</label>
      <input type="text" class="form-control" id="awayTeam" placeholder="Away Team...">
    </div>
    <div class="col-4">
      <label for="" class="form-label">Set 1 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setOne" placeholder="xx-xx...">
    </div>
    <div class="col-4">
      <label for="inputAddress2" class="form-label">Set 2 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setTwo" placeholder="xx-xx...">
    </div>
    <div class="col-4">
      <label for="inputAddress2" class="form-label">Set 3 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setThree" placeholder="xx-xx...">
    </div>
    <div class="col-6">
      <label for="inputAddress2" class="form-label">(OPTIONAL) Set 4 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setFour" placeholder="xx-xx...">
    </div>
    <div class="col-6">
      <label for="inputAddress2" class="form-label">(OPTIONAL) Set 5 Score (HomeScore-AwayScore):</label>
      <input type="text" class="form-control" id="setFive" placeholder="xx-xx...">
    </div>
    <div class="col-12 text-center">
      <button type="button" class="btn btn-lg btn-primary me-1" onclick="createNewMatch()">Add New Match</button>
      <button type="button" class="btn btn-lg btn-primary ms-1" onclick="clearStorage()">Clear Added Matches</button>
    </div>
  </form>
  <p class="lead text-center mt-3" id="msg"></p>
</div>
</template>

<script>
export default {
  name: 'Standings',
  props: {
    
  }
}
</script>

<style scoped>

</style>