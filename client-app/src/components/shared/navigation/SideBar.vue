<template>
   <div class="dashboard--wrap">
        <div class="sidebar--nav__wrap">
            <nav class="nav nav--sidebar" :style="{ width: sidebarWidth }">
            <!-- Navigation Section //random-->
                <div class="nav__section">
                    <!-- Navigation Section content -->
                    <div class="nav__section__content">
                        <div class="nav__section__content__group no--border sidebar--nav__brand">
                            <!-- navigation item -->
                            <div class="nav__item">
                                <div class="nav__item__logo">
                                    <siner-logo :layout="'center'"></siner-logo>
                                </div>
                            </div>
                            <div @click="toggleSidebar()" class="cursor-pointer">
                                <template v-if="!collapse" >
                                    <icon-svg 
                                        fill="rgba(66, 82, 110)" 
                                        class="nav__icon" 
                                        name="arrow-from-right" 
                                        icon-position="left"
                                        :style="{ fill: 'rgba(66, 82, 110)' }"
                                        :width="'3rem'"

                                    />  
                                </template> 
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
                                        :width="'3rem'"
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
                                        :width="'3rem'"
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
        </div>
    <!-- collapse button -->
        <!-- <div data-resize-control="true" class="collapse--wrap">
            <div class="collapse--after"></div>
                <button role="separator" aria-label="Resize" aria-expanded="true" class="collapse--btn">
                    <span></span>
                </button>
                <div role="presentation">
                    <button data-resize-button="true" aria-expanded="true" aria-label="Toggle navigation" type="button" class="css-gb880y">
                        <span role="presentation" aria-hidden="true" class="css-gv1w16" style="--icon-primary-color:currentColor; --icon-secondary-color:#FFFFFF;">
                            <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                <path d="M10.294 9.698a.988.988 0 010-1.407 1.01 1.01 0 011.419 0l2.965 2.94a1.09 1.09 0 010 1.548l-2.955 2.93a1.01 1.01 0 01-1.42 0 .988.988 0 010-1.407l2.318-2.297-2.327-2.307z" fill="currentColor" fill-rule="evenodd"></path>
                            </svg>
                        </span>
                    <div class="css-z8pkji"></div>
                </button>
            </div>
        </div> -->
   </div>
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
    },
    props: ["toggleSidebar", "collapse", "sidebarWidth"]
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
