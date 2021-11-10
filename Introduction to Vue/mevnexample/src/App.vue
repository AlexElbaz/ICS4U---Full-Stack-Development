<template>
  <div class="container">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create Post</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
      </ul>
    </nav><br />
    <transition name="fade">
      <router-view @add-post="addPost" :posts="posts"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        posts: Array
      }
    },
    created() {
      this.posts = [
          {
            "id": "1",
            "title": "Doctors Appointment",
            "body": "March 5th at 2:30pm",
          },
          {
            "id": "2",
            "title": "Other Appointment",
            "body": "March 6th at 2:30pm",
          },
          {
            "id": "3",
            "title": "Other Other Appointment",
            "body": "March 7th at 2:30pm",
          }
        ]
    },
    methods: {
      addPost(newPost) {
        this.posts.push(JSON.parse(newPost))
      }
    }
  }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>