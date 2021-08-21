<template>
  <div class="home">
    <home-layout></home-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeLayout from '@/components/home/HomeLayout.vue'

export default {
  name: 'Home',
  components: {
    'home-layout': HomeLayout
  }
}
</script>
