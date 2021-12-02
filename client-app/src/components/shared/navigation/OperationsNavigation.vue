<template>
    <div class="nav__section__content__group ">
        <div class="nav__section--item nav__section--item--sub">
            <div class="workspace-link" :to="{name:'workspaces'}" style="min-width: 60%;">  
                <span class="nav__section__content__group__title ml--0">Operations</span>
            </div>
        </div>
        <div class="home--content__wrap">
            <router-link :to="{ name:'clients-view' }" class="nav__section--item">
                    <!-- name="layer"  -->
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    icon-position="left"
                    name="layer" 
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />   
                <span class="nav__section__content__group__title">Clients</span>
            </router-link>
            <div class="nav__section--item">
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    name="folder" 
                    icon-position="left"
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />   
                <span class="nav__section__content__group__title">Projects</span>
            </div>
             <router-link :to="{ name:'boards-view' }" class="nav__section--item">
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    name="user-badge" 
                    icon-position="left"
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />   
                <span class="nav__section__content__group__title">Teams</span>
            </router-link>
            <!-- Invite -->
             <div class="nav__section--item">  
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    name="multiple-users" 
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />
                <span class="nav__section__content__group__title">Invite teammates</span>
            </div>
        </div>
    </div>
</template>

<script>
import IconSvg from "../../icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../utils/dummy'
// import WorkspaceNavigation from './WorkspaceNavigation.vue'

export default {
    name: 'OperationsNavigation',
     watch:{
        //watch for route parameter change and execute method
        '$route': 'clearOnUnMount',
    },
    components: {
        'icon-svg': IconSvg,
    },
    created() {
        console.log(this.$route.path);
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces,
        activeWorkspace: ''
    }),
    computed: {
        computeCreatedWorkspaces () {
            return this.createdWorkspaces.slice(0, 2)
        },
    },
    methods: {
        createNewWorkspace() {
            // this.$store.dispatch('viewCreateWorkspaceModal', true);
            this.$store.commit('showCreateWorkspaceModal', true);
        },
        getHyphenatedPath(str) {
            return str.replace(/\s/g, "-").toLowerCase();
        },
        goToWorkspace(name, id, data) {
            const refinedPathName = name.replace(/\s/g, "-").toLowerCase();
            // this.activeWorkspace = name
            localStorage.setItem('workspaceId', id);
            localStorage.setItem('workspaceDetails', JSON.stringify(data));
            localStorage.setItem('showWorkspaceNav', true);
            this.$router.push({ name: 'workspace-detail-view', params: { name: refinedPathName } })
        },
        clearOnUnMount() {
            const path = this.$route.path;
            if (!path.includes('workspaces/')) {
                this.activeWorkspace = ''
            } 
            // else {
            //     const id = localStorage.getItem('workspaceId');
            //     const findWorkspaceObj = createdWorkspaces.find(item => item.id === id);
            //     if(findWorkspaceObj) {
            //         this.activeWorkspace = findWorkspaceObj.name
            //     }
            // }
        }
    },
    mounted() {
        const id = localStorage.getItem('workspaceId');
        const findWorkspaceObj = createdWorkspaces.find(item => item.id === id);
        if(findWorkspaceObj) {
            this.activeWorkspace = findWorkspaceObj.name
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .workspace-link.active {
        span {
            color: #5750ec;
            font-weight: 600;
        }
    }
    .nav__workspace--link {
        padding: 10px;
        display: flex;
        align-items: center;

        &.active, &:hover {
            color: #5750ec;
            font-weight: 600;
            background-color: #e4e9fd;
        }
    }
    .nav__section__content__group {
        overflow-x: scroll;
        max-height: 200px;
    }
    .home--content__wrap {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0;
        padding-left: 0;
    }
    .workspace--theme--img {
        width: 1rem;
        height: 1rem;
    }
</style>
