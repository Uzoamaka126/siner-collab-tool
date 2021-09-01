<template>
    <div class="nav__section__content__group">
        <div class="nav__section--item">  
            <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="multiple-users" 
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'3rem'"
            />
            <span class="nav__section__content__group__title">Invite teammates</span>
        </div>
    </div>
</template>

<script>
import IconSvg from "../../icons/Icon-Svg.vue";

export default {
    name: 'InviteNavigation',
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
<style scoped lang="scss">
</style>
