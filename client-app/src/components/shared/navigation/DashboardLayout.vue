<template>
    <div class="dashboard--container">
        <side-bar 
            :toggleSidebar="toggleSidebar"
            :collapse="collapse"
            :sidebarWidth="sidebarWidth"
        ></side-bar>
        <dashboard-content-layout
            :toggleSidebar="toggleSidebar"
            :collapse="collapse"
            :sidebarWidth="sidebarWidth"
        ></dashboard-content-layout>
    </div>
</template>

<script>
import Sidebar from './SideBar.vue';
import DashbaordContentLayout from './ContentLayout.vue';

export default {
    name: 'DashboardLayout',
    props: {
        
    },
    data: () => ({
        collapse: false,
        sidebarWidth: '240px'
    }),
    components: {
        'side-bar': Sidebar,
    'dashboard-content-layout': DashbaordContentLayout
    },
     methods: {
        toggleSidebar() {
            if(this.collapse === false) {
                this.collapse = true;
                this.sidebarWidth = '20px'
            } else {
                this.collapse = false;
                this.sidebarWidth = '240px'
            }
        }
    },
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
