<template>
<div class="container">
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark py-3 fixed-top">
      <div class="container">
        <a href="#" class="h1 bg-primary text-decoration-none text-light">{{title}}</a>
        <button class="navbar-toggler mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navmenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item text-center text-lg-start">
              <router-link to="/" class="nav-link">{{pathOneName}}</router-link>
            </li>
            <li class="nav-item text-center text-lg-start">
              <router-link to="/matches" class="nav-link">{{pathTwoName}}</router-link>
            </li>
            <li class="nav-item text-center text-lg-start">
              <router-link to="/matchEditor" class="nav-link">{{pathThreeName}}</router-link>
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

<script>
export default {
  name: 'Navbar',
  props: {
    title: String,
    pathOneName: String,
    pathTwoName: String,
    pathThreeName: String
  }
}
</script>

