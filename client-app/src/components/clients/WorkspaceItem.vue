<template>
    <div style="height: 100%" class="main">
        <div class="tabs horizontal ">
        </div>
        <div class="workspace__content--view">
            <router-view v-slot="{ route }">
                <transition :name="route.meta.transition || 'fade'" mode="out-in">
                    <keep-alive>
                        <component 
                            :is="currentWorkspaceItemComp" 
                            :currentWorkspaceItem="currentWorkspaceItem"
                        ></component>
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script>
// import Tabs from '../shared/tabs/Tabs.vue';
// import Tab from '../shared/tabs/Tab.vue';
import WorkspaceBoards from './WorkspaceBoards.vue';
import WorkspaceMembers from './WorkspaceMembers.vue';
import WorkspaceList from './WorkspaceLists.vue'
import { mapActions } from 'vuex';

export default {
    name: 'WorkspaceItem',
    created() {
        // console.log(this.user);
        const id = localStorage.getItem('workspaceId')
        this.getWorkspaceDetails(id)
    },
    unmounted() {
        localStorage.removeItem('workspaceId')
    },
    watch:{
    //watch for route parameter change and execute method
        '$route': 'getWorkspaceDetails',
    },
    components: {
        // Tabs,
        // Tab,
        WorkspaceBoards,
        WorkspaceMembers,
        WorkspaceList
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
        workspaceId: '',
        workspaceNavItems: [
            { id: 1, name: 'List', routeName: 'workspace-lists', component: 'WorkspaceList' },
            { id: 2, name: 'Boards', routeName: 'workspace-boards', component: 'WorkspaceBoards' },
            { id: 3, name: 'Members', routeName: 'workspace-members', component: 'WorkspaceMembers' },
            // { id: 3, name: 'Meeting notes', routeName: 'workspace-meeting-notes', iconName: 'multiple-users' },
            // { id: 4, name: 'Product requirements', routeName: 'workspace-product-requirements', iconName: 'notes' },
            // { id: 5, name: 'Settings', routeName: 'workspace-settings', iconName: 'settings-2' },
        ]
    }),
    computed: {
        currentWorkspaceItemPath () {
            if(this.$route.name) {
                return this.$route.name
            } else {
                return this.currentTabComponent
            }
        },
        currentWorkspaceItemComp() {
            const pathName = this.$route.name;
            const workspaceProp = this.workspaceNavItems.find(item => item.routeName === pathName);
            
            if(workspaceProp) {
                return workspaceProp.component
            } else {
                return 'WorkspaceBoards'
            }
        }
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