<template>
  <div class="create">
  <CreateComponent @add-post="emitPost"/>
  </div>
</template>

<script>
import CreateComponent from '@/components/CreateComponent.vue' 

export default {
    name: 'Create',
    components: {
        CreateComponent
    },
    data() {
        return {
            post:{}
        }
    },
    methods: {
        emitPost(newPost){
            this.$emit('add-post', newPost)
        }
    }
}
</script>