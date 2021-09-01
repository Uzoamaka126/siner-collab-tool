<template>
    <div class="nav__section__content__group">
        <router-link class="nav__section--item nav__section--item--sub"  :to="{name:'workspaces'}">  
            <span class="nav__section__content__group__title">Workspaces</span>
            <span class="cursor-pointer">
                <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="add" 
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'1rem'"
                /> 
            </span>
        </router-link>
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
