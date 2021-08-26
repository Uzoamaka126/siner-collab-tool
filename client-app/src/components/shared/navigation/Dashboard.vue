<template>
    <div class="dashboard--container">
        <side-bar></side-bar>
    </div>
</template>

<script>
import Sidebar from './SideBar.vue'
export default {
    name: 'Dashboard',
    props: {
        
    },
    data: () => ({
    }),
    components: {
        'side-bar': Sidebar
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .dashboard--container {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
</style>
