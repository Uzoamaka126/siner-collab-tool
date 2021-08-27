<template>
 
    <div class="nav__section__content__group">
        <div class="nav__section--item nav__section--item--sub">  
            <span class="nav__section__content__group__title">Workspaces</span>
            <icon-svg 
                fill="rgba(66, 82, 110)" 
                class="nav__icon" 
                name="add" 
                :style="{ fill: 'rgba(66, 82, 110)' }"
                :width="'0.825rem'"
            /> 
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .nav__section--item {
        display: flex;
        align-items: center;
        color: #42526e;
        padding-left:10px;
    }
    .nav__icon {
        width: 1rem;
        margin-right: 10px;
        display: flex;
        height: 24px;
        width: 24px;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        margin-right: 16px;
    }
    .nav__section--item--sub {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-transform: uppercase;
        cursor: text;
        
        span {
            font-size: 12px;
        }
    }
</style>
