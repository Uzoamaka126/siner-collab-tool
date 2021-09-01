<template>
    <div class="nav__section__content__group" style="margin-bottom: 0px; padding-bottom: 0px;">
        <router-link :to="{ name:'home-view' }" class="nav__section--item">
            <!-- naviation item link text -->
            <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="home" 
                icon-position="left"
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'3rem'"
            />   
            <span class="nav__section__content__group__title">Home</span>
        </router-link>
        <router-link :to="{ name:'boards-view' }" class="nav__section--item">
            <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="board" 
                icon-position="left"
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'3rem'"
            />   
            <span class="nav__section__content__group__title">Boards</span>
        </router-link>
    </div>
</template>

<script>
import IconSvg from "../../icons/Icon-Svg.vue";

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
        padding: 12px 10px;
    }
</style>
