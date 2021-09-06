<template>
    <div style="height: 100%">
        <!-- main settings wrapper -->
        <tabs>
            <tab ref="li" title="Tab 1">Hello From Tab 1</tab>
            <tab ref="li" title="Tab 2">Hello From Tab 2</tab>
            <tab ref="li" title="Tab 3">Hello From Tab 3</tab>
            <tab ref="li" title="Tab 4">Hello From Tab 4</tab>
        </tabs>
    </div>
</template>

<script>
import Tab from '../shared/tabs/Tab.vue'
import Tabs from '../shared/tabs/Tabs.vue';

export default {
    name: 'SettingsLayout',
    created() {
        // console.log(this.user);
        
    },
    components: {
        Tab,
        Tabs
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


</style>
