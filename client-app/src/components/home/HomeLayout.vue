<template>
    <div style="height: 100%">
        <!-- main home wrapper -->
        <div class="home__wrap">
            <div class="home__wrap--item">
                <div class="header__item--wrap">
                    <div class="header">
                        <div class="left" style="display: flex; align-items: cemter">
                            <!-- <div class="icon--wrap"> -->
                                <icon-svg 
                                    fill="rgba(107, 119, 140, 1)" 
                                    class="nav__icon" 
                                    name="arrow-down" 
                                    icon-position="left"
                                    :width="'1rem'"
                                    style="margin-right: 4px;"
                                />  
                            <!-- </div> -->
                            <span class="header--text">Workspaces</span>
                        </div>
                        <div class="right">
                            <span class="text--xs text--upper text--color-normal mr--10">VIEW AS</span>
                            <span>
                                <div class="view--type" @click="toggleDropdown()">
                                    <span class="wrap--text">List</span>
                                    <icon-svg 
                                        fill="rgba(107, 119, 140, 1)" 
                                        class="nav__icon no--margin__xr" 
                                        name="chevron-down" 
                                        icon-position="left"
                                        :width="'1rem'"
                                    />  
                                </div>
                                <!-- dropdown -->
                                 <div class="dropdown dropdown--lg" :class="{ 'active' : dropdownIsActive.workspaces }" id="grid">
                                    <div class="dropdown__content">
                                        <div class="dropdown__content--group" style="padding-left: 1rem;">
                                            <span>
                                                <div class="dropdown__item__link" v-for="item, index in createdWorkspaces" :key="index">
                                                    <p class="title">{{ item.name }}</p>
                                                    <p class="sub-title">{{ item.type }}</p>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="home--content">
                    <div class="link__workspaces">
                        <router-link class="sub-text--link text-underline-onHover text--sm" to="/dashboard/workspaces">See all workspaces</router-link>
                    </div>
                    <div class="home--content__wrap">
                        <div class="home--content--item" v-for="(item, index) in computeCreatedWorkspaces" :key="index">
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
                                    class="nav__icon" 
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
                    <div class="home--content__wrap">
                        <div class="home--content--item" v-for="(item, index) in computeCreatedWorkspaces" :key="index">
                            <router-link :to="{ path: `/dashboard/boards/${item.name }`}" >
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
        dropdownIsActive: false,
    }),
    components: {
        'onboarding-modal': OnboardingModal,
        'icon-svg': IconSvg,
    },
    computed: {
        computeCreatedWorkspaces() {
            return this.createdWorkspaces.slice(0, 2)
        }
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
        toggleDropdown() {
            this.dropdownIsActive = !this.dropdownIsActive
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.link__workspaces {
    display: flex;
    justify-content: flex-end;

    // a {
    //     font-size: 14px;
    //     color: #128fc0;

    //     &:hover {
    //         text-decoration: underline;
    //     }
    // }
}
.right {
    display: flex;
    align-items: center;
}
.view--type {
    display: flex;
    align-items: center;
    border-width: 0;
    border-radius: 3px;
    -webkit-transition: background 0.1s ease-out,box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38);
    transition: background 0.1s ease-out,box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38);
    white-space: nowrap;
    background: rgba(9,30,66,0.04);
    color: #42526E !important;
    cursor: pointer;
    height: 2.2857142857142856em;
    line-height: 2.2857142857142856em;
    padding: 0 10px;
    vertical-align: middle;
    width: auto;
    -webkit-justify-content: center;
    justify-content: center;
    outline: none;
}
.wrap--text {
    font-weight: 600;
    font-size: 14px;
}
</style>
