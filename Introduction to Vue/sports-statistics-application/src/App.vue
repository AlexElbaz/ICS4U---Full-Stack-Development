<template>
  <Navbar title="VNL 2021 Standings" pathOneName="Standings" pathTwoName="Match History" pathThreeName="Match Editor"/>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

  export default {
    name: "App",
    components: {
      Navbar
    }
  }
</script>

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
