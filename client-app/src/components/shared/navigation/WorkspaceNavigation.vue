<template>
    <div class="nav__section__content__group">
        <div class="nav__section--item nav__section--item--sub">
            <router-link class="workspace-link" :to="{name:'workspaces'}">  
                <span class="nav__section__content__group__title">Workspaces</span>
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
    </div>
</template>

<script>
import IconSvg from "../../icons/Icon-Svg.vue";

export default {
    name: 'WorkspaceNavigation',
    components: {
        'icon-svg': IconSvg
    },
    data: () => ({
    }),
    computed: {
        // df () {
        //     return this.showOnboardingModal
        // }
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
</style>
