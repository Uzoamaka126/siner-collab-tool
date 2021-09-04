<template>
    <div style="height: 100%">
        <!-- main home wrapper -->
        <div class="home__wrap">
            <div class="home__wrap--item">
                <div class="header__item--wrap">
                    <div class="header">
                        <div class="left" style="display: flex; align-items: center">
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
                            <span class="header--text">Workspaces</span>
                        </div>
                        <div class="right">
                            <span class="text--xs text--upper text--color-normal mr--10">VIEW AS</span>
                            <span class="positionRelative">
                                <div class="view--type" @click="toggleDropdown()" :style="viewTypeStyles2">
                                    <span class="wrap--text">{{ workspaceDisplay }}</span>
                                    <icon-svg 
                                        fill="rgba(107, 119, 140, 1)" 
                                        class="nav__icon no--margin__xr" 
                                        name="chevron-down" 
                                        icon-position="left"
                                        :width="'1rem'"
                                    />  
                                </div>
                                <!-- dropdown -->
                                 <div class="dropdown dropdown--lg" :class="{ 'active' : dropdownIsActive }" id="grid">
                                    <div class="dropdown__content">
                                        <div class="dropdown__content--group">
                                            <span>
                                                <div class="dropdown__item__link">
                                                    <div @click="selectDisplayType('Tiles')">
                                                        <p class="sub-title">As Tiles</p>
                                                    </div>
                                                    <div @click="selectDisplayType('List')">
                                                        <p class="sub-title">As List</p>
                                                    </div>
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
                    <div class="home--content__wrap" :class="toggleWorkspaceDisplayClass">
                        <div 
                            class="home--content--item"
                            :class="{ 'mr--25': workspaceDisplay === 'Tiles'}" 
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
        workspaceDisplay: 'List'
    }),
    computed: {
        viewTypeStyles2() {
            return {
                outline: this.dropdownIsActive ? '2px ridge rgba(224, 200, 234, 0.6)' : ''
            }
        },
         computeCreatedWorkspaces() {
            return this.createdWorkspaces.slice(0, 2)
        },
        viewTypeStyles() {
            return {
                focus: this.dropdownIsActive
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
        selectDisplayType(value) {
            this.workspaceDisplay = value
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.link__workspaces {
    display: flex;
    justify-content: flex-end;
}
.right {
    display: flex;
    align-items: center;
}
.view--type {
    display: flex;
    align-items: center;
    border-width: 0;
    border-radius: 5px;
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

    &.focus {
        outline: 2px ridge rgba(224, 200, 234, 0.6);
    }
}
.wrap--text {
    font-weight: 600;
    font-size: 14px;
}
.dropdown {
    transform: translate3d(0px, 0px, 0px);
    min-width: 100px;
    transition: box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;

    &__content--group {
        padding: 0;
    }

    &__item__link {
        padding: 0px;

        div {
            padding-left: 10px;
            padding-right: 10px;

            &:hover {
                background-color: #e4e9fd;
            }

             .sub-title {
                padding: 5px 0;
                margin-top: 0px;
            }
        }
    }
}

.home--content__wrap {
    &.list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    &.tiles {
        display: flex;
        flex-direction: revert;
        justify-content: unset;
        align-items: flex-start;
        flex-grow: 1;
    }
}
</style>
