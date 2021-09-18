<template>
    <div class="sidebar--nav__wrap">
        <nav class="nav nav--sidebar" :style="{ width: sidebarWidth }">
        <!-- Navigation Section //random-->
            <div class="nav__section">
                <!-- Navigation Section content -->
                <div class="nav__section__content">
                    <div class="nav__section__content__group no--border sidebar--nav__brand mt--15">
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
                        <template v-if="!showWorkspaceNav">
                            <div class="nav__section__content__group">
                                <home-navigation></home-navigation>
                            </div>
                            <!-- Workspace navigation group -->
                            <workspace-navigation></workspace-navigation>
                            <invite-navigation></invite-navigation>
                            <settings-navigation></settings-navigation>
                        </template>
                        <template v-else>
                            <workspace-item-navigation></workspace-item-navigation>
                        </template>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import Logo from '../Logo.vue';
import IconSvg from "../../icons/Icon-Svg.vue";
import WorkspaceNavigation from './WorkspaceNavigation.vue';
import SettingsNavigation from './SettingsNavigation.vue';
import InviteNavigation from './InviteNavigation.vue';
import HomeNavigation from './HomeNavigation.vue';
import WorkspaceItemNavigation from './WorkspaceNavigationItem.vue'

export default {
    name: 'SideBarLayout',
    components: {
        'siner-logo': Logo,
        'icon-svg': IconSvg,
        'workspace-navigation': WorkspaceNavigation,
        'settings-navigation': SettingsNavigation,
        'invite-navigation': InviteNavigation,
        'home-navigation': HomeNavigation,
        'workspace-item-navigation': WorkspaceItemNavigation
    },
    created() {
        this.showWorkspaceNavComputed();
    },
    watch:{
        //watch for route parameter change and execute method
        '$route': 'showWorkspaceNavComputed',
    },
    data: () => ({
        showOnboardingModal: false,
        showWorkspaceNav: false
    }),
    computed: {
        
    },
    methods: {
        showWorkspaceNavComputed () {
            if(!JSON.parse(localStorage.getItem('showWorkspaceNav'))) {
                this.showWorkspaceNav = false;
                return false
            } else {
                this.showWorkspaceNav = true;
                return true;
            }
        }
    },
    props: ["toggleSidebar", "collapse", "sidebarWidth"]
}
</script>
