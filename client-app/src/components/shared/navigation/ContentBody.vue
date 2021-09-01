<template>
  <div class="content__body">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeView from '../../../views/Home.vue'
import BoardsView from '../../../views/Boards.vue'

export default {
  name: 'DashbaordContentBody',
  created() {
  },
  components: {
    'home-view': HomeView,
    'boards-view': BoardsView
  },
  props: ["toggleSidebar", "collapse", "sidebarWidth"]
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
