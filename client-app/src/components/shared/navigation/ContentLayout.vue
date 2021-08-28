<template>
  <div class="content">
    <dashboard-content-header
        :toggleSidebar="toggleSidebar"
        :collapse="collapse"
        :sidebarWidth="sidebarWidth"
    >
    </dashboard-content-header>
    <dashboard-content-body></dashboard-content-body>
  </div>
</template>

<script>
// @ is an alias to /src
import DashbaordContentHeader from './ContentHeader.vue';
import DashbaordContentBody from './ContentBody.vue';

export default {
  name: 'DashbaordContentLayout',
  components: {
    'dashboard-content-header': DashbaordContentHeader,
    'dashboard-content-body': DashbaordContentBody
  },
  props: ["toggleSidebar", "collapse", "sidebarWidth"]
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
</style>
