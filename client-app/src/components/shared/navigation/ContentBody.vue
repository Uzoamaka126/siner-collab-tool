<template>
  <div class="content__body" :style="collapseProp ? bodyStylesCollapse : bodyStyles">
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
  props: ["collapse"],
  data() {
    return {
      collapseProp: this.collapse,
      bodyStyles: {
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: 'all .3s ease-out'
      },
      bodyStylesCollapse: {
        maxWidth: 'none',
        marginLeft: '0px',
        marginRight: '0px',
        transition: 'all .3s ease-out'
      },
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
