<template>
    <div style="height: 100%" class="main">
        <div class="tabs horizontal ">
            <ul class="tab-list left" role="tabList">
                <li 
                    v-for="(tab, index) in tabsList"
                    :key="tab.name"
                    class="tab-list__item"
                    tabIndex="0"
                    role="tabItem"
                    :aria-selected="selectedIndex === index ? true : false"
                    @click="getCurrentTab(tab.component, index)"
                >
                {{ tab.id }}
                </li>
            </ul>
            <div class="tab">
                <div class="tab--panel" role="tabPanel" data-v-0292cb4e="">
                    <div class="tab-content">
                        <keep-alive>
                            <component :is="currentTabComponent" :currentWorkspaceItem="currentWorkspaceItem"></component>
                        </keep-alive>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tabs from '../shared/tabs/Tabs.vue';
import Tab from '../shared/tabs/Tab.vue';
import WorkspaceBoards from './WorkspaceBoards.vue';
import WorkspaceMembers from './WorkspaceMembers.vue';
import { mapActions } from 'vuex';

export default {
    name: 'WorkspaceItem',
    created() {
        // console.log(this.user);
        this.getWorkspaceDetails(this.$route.params.id)
    },
    watch:{
    //watch for route parameter change and execute method
        '$route': 'getWorkspaceDetails',
    },
    components: {
        Tabs,
        Tab,
        WorkspaceBoards,
        WorkspaceMembers
    },
    props: {
        user: Object
    },
    data: () => ({
        currentTabComponent: "WorkspaceBoards",
        tabsList: [
            {   
                id: 'Boards',
                component: 'WorkspaceBoards'
            },
            {   
                id: 'Members',
                component: 'WorkspaceMembers'
            },
            {   
                id: 'Activity',
                component: 'WorkspaceActivity'
            },
            {   
                id: 'Settings',
                component: 'WorkspaceSettings'
            },
        ],
        selectedIndex: 0,
        currentWorkspaceItem: undefined
    }),
    computed: {
        
    },
    methods: {
        ...mapActions(['setSingleWorkspaceDetails']),
        getCurrentTab(value, index) {
            this.currentTabComponent = value;
            this.selectedIndex = index;
        },
        getWorkspaceDetails(id) {
            const workspaces = this.$store.state.workspaces;
            const workspaceItem = workspaces.find(item => item.id === id);
            // this.setSingleWorkspaceDetails(workspaceItem);
            this.currentWorkspaceItem = workspaceItem;
        },
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .main {
        padding-top: 30px;
    }

</style>

<!-- <tabs>
            <tab title="Profile" titleSlot="lll">

            </tab>
            <tab title="Display" titleSlot="bbb"></tab>
            <tab title="Account Settings"></tab>
        </tabs> -->