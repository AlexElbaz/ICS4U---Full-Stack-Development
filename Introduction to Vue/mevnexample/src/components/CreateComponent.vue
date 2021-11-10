<template>
  <div>
    <h1>Create A Post</h1>
    <form @submit.prevent="addPost">
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
          <button class="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            post:{}
        }
    },
    methods: {
        addPost() {
          if (!this.post.title || !this.post.body) {
            alert('Please Add a Post.')
            return
          }

          const newPost = {
            id: Math.random()*10000,
            title: this.post.title,
            body: this.post.body,
          }

          console.log(JSON.stringify(newPost))
          this.$emit('add-post', JSON.stringify(newPost))
          this.post.title = ''
          this.post.body = ''
        }
    }
  }
</script>