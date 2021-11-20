<template>
<div class="container" onload="createNewPage(); getTenMatches()">
  <div id="main" class="card card-body">
      <h2 class="title text-center mb-5">Volleyball Nations League 2021 Match History</h2>
      <table id="rows" class="table table-borderless text-light">
      </table>
      <div class="btn-toolbar align-self-center">
        <button type="button" class="btn btn-secondary" id="btnPrev" onclick="previousPage()"><i class="bi bi-arrow-left"></i></button>
        <div class="btn-group" id='pageButtons' role="group">
          <button type="button" class="btn btn-secondary" id="btn1" onclick="changePage(1)">1</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn2" onclick="changePage(2)">2</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn3" onclick="changePage(3)">3</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn4" onclick="changePage(4)">4</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn5" onclick="changePage(5)">5</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn6" onclick="changePage(6)">6</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn7" onclick="changePage(7)">7</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn8" onclick="changePage(8)">8</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn9" onclick="changePage(9)">9</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn10" onclick="changePage(10)">10</button>
          <button type="button" class="btn btn-secondary d-none d-md-inline" id="btn11" onclick="changePage(11)">11</button>
          <button type="button" class="btn btn-secondary d-md-none">...</button>
          <button type="button" class="btn btn-secondary" id="btn12" onclick="changePage(12)">12</button>
        </div>
        <button type="button" class="btn btn-secondary" id="btnNext" onclick="nextPage()"><i class="bi bi-arrow-right"></i></button>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Standings',
  props: {
    
  },
  methods: {
    async fetchMatches() {
      const res = await fetch('http://localhost:5000/matches')

      const data = await res.json()

      return data
    }
  },
  async created() {
    this.matches = await this.fetchMatches()
  }
}
</script>

<style scoped>

</style>