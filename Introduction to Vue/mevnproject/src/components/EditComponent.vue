<template>
  <div>
    <h1>Edit Post</h1>
    <form @submit.prevent="updatePost">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Title:</label>
            <input type="text" class="form-control" v-model="post.title">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Post Body:</label>
              <textarea class="form-control" v-model="post.body" rows="5"></textarea>
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        post: {}
      }
    },
    methods: {
      async updatePost() {
        let uri = `http://localhost:5000/api/update/${this.$route.params.id}`;
        await axios.patch(uri, this.post);
        this.$router.push({name: 'posts'});
      }
    },
    async created() {
      let uri = `http://localhost:5000/api/post/${this.$route.params.id}`;
      const res = await axios.get(uri);
      this.post = res.data;
    }
  }
</script>