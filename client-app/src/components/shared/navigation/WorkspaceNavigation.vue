<template>
    <div class="nav__section__content__group ">
        <div class="nav__section--item nav__section--item--sub">
            <router-link class="workspace-link" :to="{name:'workspaces'}" style="min-width: 60%;">  
                <span class="nav__section__content__group__title ml--0">Workspaces</span>
            </router-link>
            <span class="cursor-pointer" @click="createNewWorkspace()">
                <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="add" 
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'0.8rem'"
                /> 
            </span>
        </div>
        <div class="home--content__wrap">
            <div 
                class="home--content--item"
                v-for="(item, index) in createdWorkspaces" 
                :key="index"
            >
                <router-link :to="{ path: `/dashboard/workspaces/${item.name }`}" class="nav__workspace--link">
                    <div class="workspace--theme--img"></div>
                    <span class="flex flex-column">
                        <span class="text--color-dark text--sm text--bold mt--5">{{ item.name }}</span>
                        <span class="text--xs text--normal text--color-normal" style="margin-top: 3px;">{{ item.type }}</span>
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import IconSvg from "../../icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../utils/dummy'

export default {
    name: 'WorkspaceNavigation',
    components: {
        'icon-svg': IconSvg
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces,
    }),
    computed: {
        computeCreatedWorkspaces () {
            return this.createdWorkspaces.slice(0, 2)
        }
    },
    methods: {
        createNewWorkspace() {
            // console.log(this.$store.commit)
            // this.$store.dispatch('viewCreateWorkspaceModal', true);
            this.$store.commit('showCreateWorkspaceModal', true);
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

        &.active {
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
