<template>
    <nav class="nav nav--sidebar">
        <!-- Navigation Section //random-->
        <div class="nav__section">
            <!-- Navigation Section content -->
            <div class="nav__section__content">
                <div class="nav__section__content__group no--border">
                    <!-- navigation item -->
                    <div class="nav__item">
                        <div class="nav__item__logo">
                            <siner-logo :layout="'center'"></siner-logo>
                        </div>
                    </div>
                </div>

                <div class="nav__section__content__links">
                    <div class="nav__section__content__group">
                        <div class="nav__section--item">
                            <icon-svg 
                                fill="rgba(66, 82, 110)" 
                                class="nav__icon" 
                                name="home" 
                                icon-position="left"
                                :style="{ fill: 'rgba(66, 82, 110)' }"
                                :width="'0.825rem'"
                            />   
                            <span class="nav__section__content__group__title">Home</span>
                        </div>
                         <div class="nav__section--item">
                            <icon-svg 
                                fill="rgba(66, 82, 110)" 
                                class="nav__icon" 
                                name="board" 
                                icon-position="left"
                                :style="{ fill: 'rgba(66, 82, 110)' }"
                                :width="'0.825rem'"
                            />   
                            <span class="nav__section__content__group__title">Boards</span>
                        </div>
                    </div>
                     <!-- Workspace navigation group -->
                    <workspace-navigation></workspace-navigation>
                    <invite-navigation></invite-navigation>
                    <settings-navigation></settings-navigation>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Logo from '../Logo.vue';
import IconSvg from "../../icons/Icon-Svg.vue";
import WorkspaceNavigation from './WorkspaceNavigation.vue';
import SettingsNavigation from './SettingsNavigation.vue';
import InviteNavigation from './InviteNavigation.vue';

export default {
    name: 'SideBarLayout',
    components: {
        'siner-logo': Logo,
        'icon-svg': IconSvg,
        'workspace-navigation': WorkspaceNavigation,
        'settings-navigation': SettingsNavigation,
        'invite-navigation': InviteNavigation
    },
    data: () => ({
        showOnboardingModal: false,
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
        // margin-bottom:9px;
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
        
        span {
            font-size: 12px;
        }
    }
</style>
