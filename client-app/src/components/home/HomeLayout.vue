<template>
    <div style="height: 100%">
        <!-- main home wrapper -->
        <div class="home__wrap">
            <div class="home__wrap--item">
                <div class="header__item--wrap">
                    <div class="header">
                        <div style="display: flex; align-items: center">
                            <icon-svg 
                                fill="rgba(107, 119, 140, 1)" 
                                class="nav__icon cursor-pointer" 
                                name="arrow-down" 
                                icon-position="left"
                                :width="'1rem'"
                                style="margin-right: 4px;"
                            />  
                            <span class="header--text">Workspaces</span>
                        </div>
                    </div>
                </div>
                <div class="home--content">
                    <div class="link__workspaces">
                        <router-link class="sub-text--link text-underline-onHover text--sm" to="/dashboard/workspaces">See all workspaces</router-link>
                    </div>
                    <div class="home--content__wrap" :class="toggleWorkspaceDisplayClass">
                        <div 
                            class="home--content--item" 
                            v-for="(item, index) in computeCreatedWorkspaces" 
                            :key="index"
                        >
                            <router-link :to="{ path: `/dashboard/workspaces/${item.name }`}" >
                                <div class="workspace--theme--img">
                                    
                                </div>
                                <span class="flex flex-column">
                                    <span class="text--color-dark text--sm text--bold mt--5">{{ item.name }}</span>
                                    <span class="text--xs text--normal text--color-normal" style="margin-top: 3px;">{{ item.type }}</span>
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- home wrap item 2 -->
            <div class="home__wrap--item">
                <div class="header__item--wrap">
                    <div class="header">
                        <div class="left" style="display: flex; align-items: cemter">
                            <!-- <div class="icon--wrap"> -->
                                <icon-svg 
                                    fill="rgba(107, 119, 140, 1)" 
                                    class="nav__icon cursor-pointer" 
                                    name="arrow-down" 
                                    icon-position="left"
                                    :width="'1rem'"
                                    style="margin-right: 4px;"
                                />  
                            <!-- </div> -->
                            <span class="header--text">Boards</span>
                        </div>
                    </div>
                </div>
                <div class="home--content">
                    <div class="link__workspaces">
                        <router-link class="sub-text--link text-underline-onHover text--sm" to="/dashboard/boards">See all boards</router-link>
                    </div>
                    <div class="home--content__wrap" :class="toggleWorkspaceDisplayClass">
                        <div 
                            class="home--content--item" 
                            :class="{ 'mr--25': workspaceDisplay === 'Tiles'}"  
                            v-for="(item, index) in computeCreatedWorkspaces" 
                            :key="index"
                        >
                            <div>
                                <div class="workspace--theme--img">
                                    
                                </div>
                                <span class="flex flex-column">
                                    <span class="text--color-dark text--sm text--bold mt--5">{{ item.name }}</span>
                                    <span class="text--xs text--normal text--color-normal" style="margin-top: 3px;">{{ item.type }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Add onboarding modal -->
         <onboarding-modal 
            :user="{
                id: 1,
                isVerified: true
            }"
            :showOnboardingModal="showOnboardingModal"
        >
        </onboarding-modal>
    </div>
</template>

<script>
import OnboardingModal from '../shared/modals/Onboarding.vue';
import IconSvg from "../icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../utils/dummy'
import { VaButtonDropdown } from 'vuestic-ui'


export default {
    name: 'HomeLayout',
    created() {
        console.log(this.user);
        if(this.user && this.user.isRecentlyCreated === true) {
            this.setShowOnboardingModal('show');
        }
    },
    props: {
        user: Object
    },
    data: () => ({
        showOnboardingModal: false,
        createdWorkspaces: createdWorkspaces,
    }),
    computed: {
         computeCreatedWorkspaces() {
            //  make sure that the list view only shows not more than 3 items and make them horizontally scrollable
            if(this.workspaceDisplay === 'List') {
                return this.createdWorkspaces.slice(0, 2)
            } else {
                return this.createdWorkspaces.slice(0, 7)
            }
        },
        toggleWorkspaceDisplayClass() {
            return {
                list: this.workspaceDisplay === 'List',
                tiles: this.workspaceDisplay === 'Tiles'
            }
        }
    },
    components: {
        'onboarding-modal': OnboardingModal,
        'icon-svg': IconSvg,
        VaButtonDropdown
    },
    methods: {
        setShowOnboardingModal(value) {
            if(value === 'show') {
                this.showOnboardingModal = true 
            } else if(value === 'hide') {
                this.showOnboardingModal = false 
            } else {
                this.showOnboardingModal = false 
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../../assets/scss/pages/home.scss'
</style>
