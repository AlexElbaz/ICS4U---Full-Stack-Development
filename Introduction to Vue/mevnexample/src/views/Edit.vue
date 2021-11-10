<template>
  <div class="edit">
    <EditComponent :posts="posts"/>
  </div>
</template>

<script>
import EditComponent from '@/components/EditComponent.vue'

export default {
  name: 'Edit',
  props: {
    posts: Array
  },
  components: {
    EditComponent
  }
}
</script>