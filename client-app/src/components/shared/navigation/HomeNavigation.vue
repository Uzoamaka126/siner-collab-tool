<template>
    <div class="nav__section__content__group">
        <router-link :to="{ name:'home-view' }" class="nav__section--item">
            <!-- naviation item link text -->
            <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="home" 
                icon-position="left"
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'24px'"
            />   
            <span class="nav__section__content__group__title">Home</span>
        </router-link>
    </div>
</template>

<script>
import IconSvg from "../../shared/icons/Icon-Svg.vue";

export default {
    name: 'HomeNavigation',
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

<style lang="scss" scoped>
    .nav__section--item {
        padding: 10px;
    }
</style>
