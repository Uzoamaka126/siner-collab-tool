<template>
  <div class="content__body">
    <router-view :key="$route.fullPath"></router-view>
    <create-workspace 
      :showOnboardingModal="this.$store.state.showCreateWorkspaceModal"
    ></create-workspace>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeView from '../../../views/Home.vue'
import BoardsView from '../../../views/Boards.vue'
import CreateWorkspace from '../modals/CreateWorkspace.vue'

export default {
  name: 'DashbaordContentBody',
  created() {
    // console.log(this.$store.state);
  },
  components: {
    'home-view': HomeView,
    'boards-view': BoardsView,
    CreateWorkspace
  },
  props: ["toggleSidebar", "collapse", "sidebarWidth"]
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
