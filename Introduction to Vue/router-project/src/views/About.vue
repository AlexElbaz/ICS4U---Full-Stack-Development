<template>
  <div class="about">
    <h1 @click='test'>This is an about page</h1>
  </div>
</template>

<script>

export default {
  name: 'About',
  methods: {
    test() {
      //this.$router.push({path: '/'}) // Home page path.
      this.$router.push({name: 'Home', params: {username: 'eduardo'}}) // Still goes to home page, just based on path name.
        // If want to use params, MUST access path through path name or params will be ignored.
    }
  }

}
</script>
