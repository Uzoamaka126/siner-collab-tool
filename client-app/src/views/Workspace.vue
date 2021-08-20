<template>
    <workspace-layout></workspace-layout>
</template>

<script>
import WorkspaceLayout from '../components/workspace/WorkspaceLayout.vue'
export default {
    name: 'WorkspaceView',
    components: {
        'workspace-layout' : WorkspaceLayout
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
