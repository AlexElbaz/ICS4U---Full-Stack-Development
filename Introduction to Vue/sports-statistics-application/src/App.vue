<template>
<div class="container">
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark py-3 fixed-top">
    <div class="container">
      <a href="#" class="h1 bg-primary text-decoration-none text-light">VNL 2021 Statistics</a>
      <button class="navbar-toggler mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item text-center text-lg-start">
            <router-link to="/" class="nav-link">Standings</router-link>
          </li>
          <li class="nav-item text-center text-lg-start">
            <router-link to="/matches" class="nav-link">Match History</router-link>
          </li>
          <li class="nav-item text-center text-lg-start">
            <router-link to="/addmatch" class="nav-link">Add Matches</router-link>
          </li>
          </ul>
      </div>
    </div>
  </nav><br />
  <div class="margin-from-nav">
    <router-view></router-view>
  </div>
</div>
</template>

<style>
.margin-from-nav {
  margin-top: 90px;
}

@media (min-width:768px) {
    .me-md-3 {
        margin-right: 1rem;
    }

    .ms-md-3 {
        margin-left: 1rem;
    }

    .mx-md-5 {
        margin-left: 3rem;
        margin-right: 3rem;
    }

    .mx-md-2 {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
}
</style>
