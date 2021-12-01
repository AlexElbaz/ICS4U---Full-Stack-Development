<template>
  <div class="posts">
    <IndexComponent />
  </div>
</template>

<script>
import IndexComponent from '@/components/IndexComponent.vue'

export default {
  name: 'Posts',
  props: {

  },
  components: {
    IndexComponent
  }
}


</script>