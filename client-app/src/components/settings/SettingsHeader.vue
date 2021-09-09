<template>
    <div>
        <!-- main settings wrapper -->
        <!-- <tabs>
            <tab name="Profile">
                First tab content
            </tab>
            <tab name="Display">Second tab content</tab>
            <tab name="Account Settings">Third tab content</tab>
        </tabs> -->
        <button @click="currentTabComponent = 'Tab1'">Profile</button>
        <button @click="currentTabComponent = 'Tab2'">Display</button>
        <button @click="currentTabComponent = 'Tab3'">Account Settings</button>
    </div>
</template>

<script>
// import Tab from '../shared/tabs/Tab.vue'
// import Tabs from '../shared/tabs/Tabs.vue';


export default {
    name: 'SettingsHeader',
    created() {

        
    },
    components: {
        // Tab,
        // Tabs
    },
    props: {
        user: Object
    },
    data: () => ({
        
    }),
    computed: {

    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .main {
        padding-left: 50px;
        padding-top: 30px;
    }

</style>
