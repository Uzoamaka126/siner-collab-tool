<template>
    <div style="height: 100%; padding-right: 50px; padding-left: 50px; padding-top: 4rem">
        <div style="display: flex;">
            <div class="home--content__wrap create--workspace__wrap">
                <div class="home--content--item">
                    <span>
                        <div class="workspace--theme--img create--workspace__img">
                            <icon-svg 
                                fill="rgba(194, 200, 212, 1)" 
                                class="nav__icon" 
                                name="add" 
                                icon-position="left"
                                :width="'24px'"
                                :height="'24px'"
                            /> 
                        </div>
                        <span class="flex flex-column">
                            <span class="text--color-dark text--sm text--bold mt--5 text-center">New workspace</span>
                        </span>
                    </span>
                </div>
            </div>
            <div class="home--content__wrap">
                <div class="home--content--item positionRelative" v-for="(item, index) in createdWorkspaces" :key="index">
                    <template v-if="isMenuItemHover === item.name">
                        <div>
                            <div 
                                class="menu__wrap--icon cursor-pointer" 
                                :class="{ show: isMenuItemHover === item.name }" 
                                @click="toggleShowMenUHover(item.name)"
                            >
                                <icon-svg 
                                    fill="#fff" 
                                    class="nav__icon" 
                                    name="dots-horizontal-rounded" 
                                    icon-position="left"
                                    :width="'24px'"
                                    :height="'24px'"
                                /> 
                            </div>
                            <div class="dropdown dropdown--avatar dropdown--menu" :class="{ 'active' : isMenuDropdownShow === item.name }" id="user">
                                <div class="dropdown__content">
                                    <div class="dropdown__content--group dropdown__content--group--avatar">
                                        <span>
                                            <div class="dropdown__item__link flex align-items-center">
                                                <span class="theme-display--preview"></span>
                                                <span class="title">Set Theme</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="dropdown__content--group dropdown__content--group--avatar">
                                        <span>
                                            <div class="dropdown__item__link flex align-items-center">
                                                <icon-svg 
                                                    fill="rgba(194, 200, 212, 1)" 
                                                    class="nav__icon mr--5" 
                                                    name="link" 
                                                    icon-position="left"
                                                    :width="'16px'"
                                                    :height="'16px'"
                                                /> 
                                                <span class="title">Copy Workspace Link</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="dropdown__content--group dropdown__content--group--avatar">
                                        <span>
                                            <div class="dropdown__item__link flex align-items-center">
                                                <icon-svg 
                                                    fill="rgba(194, 200, 212, 1)" 
                                                    class="nav__icon mr--5" 
                                                    name="edit" 
                                                    icon-position="left"
                                                    :width="'16px'"
                                                    :height="'16px'"
                                                /> 
                                                <span class="title">Edit Workspace</span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- <router-link :to="{ path: `/dashboard/boards/${getHyphenatedPath(item.name, item.id)}`}"> -->
                    <span class="cursor-pointer" @click="goToWorkspace(item.name, item.id)">
                        <div 
                            class="workspace--theme--img" 
                            @mouseenter="showMenuIconOnHover(item.name)"
                            @mouseleave="showMenuIconOnHover(null)"
                            :id="item.name"
                        >
                        </div>
                        <span class="flex flex-column">
                            <span class="text--color-dark text--sm text--bold mt--5 text-center">{{ item.name }}</span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import IconSvg from '../icons/Icon-Svg.vue';
import { FloatMenu } from 'vue-float-menu'

export default {
    name: 'WorkspaceLayout',
    created() {
        // console.log(this.user);
        if(this.user && this.user.isRecentlyCreated === true) {
            this.setShowOnboardingModal('show');
        }
    },
    props: {
        user: Object
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces,
        isMenuItemHover: '',
        isMenuDropdownShow: ''
    }),
    components: {
        IconSvg,
        FloatMenu
    },
    computed: {
    },
    methods: {
        showMenuIconOnHover(name) {
            if(name === null) {
                // this.isMenuItemHover = '';
                // this.isMenuDropdownShow = '';
                return
            } else {
                const getWorkspaceItem = this.createdWorkspaces.find(item => item.name === name)
                if (getWorkspaceItem.name) {
                this.isMenuItemHover = getWorkspaceItem.name;
                }
            }
        },
        toggleShowMenUHover(name) {
            // if(name === null) {
            //     this.isMenuDropdownShow = '';
            //     return
            // } else {
               const getWorkspaceItem = this.createdWorkspaces.find(item => item.name === name);
            //    console.log(getWorkspaceItem);
                if (getWorkspaceItem.name) {
                    this.isMenuDropdownShow = getWorkspaceItem.name;
            console.log(name, this.isMenuDropdownShow);

                }
            // }
            
        },
        getHyphenatedPath(str) {
            return str.replace(/\s/g, "-").toLowerCase();
        },
        goToWorkspace(name, id) {
            const refinedPathName = name.replace(/\s/g, "-").toLowerCase();
            localStorage.setItem('workspaceId', id);
            this.$router.push({ name: 'workspace-detail-view', params: { name: refinedPathName } })
        }
    }
}
</script>

<style lang="scss" scoped>
    .home--content__wrap {
        display: flex;
        flex-wrap: wrap;
    }
    .workspace--theme--img {
        height: 120px;
        width: 120px;
        border-radius: 20px;
    }
    .home--content--item {
        border-radius: 30px;
        box-sizing: border-box;
        height: 226px;
        min-width: 152px;
        // padding: 16px 0;
        width: 152px;
        align-items: center;
        display: flex;
        flex-flow: column;
        position: relative;
        transition-duration: .4s;
        margin-right: 1.8rem;

         &:hover {
            transform: translate3d(0, 4px, 0);
        }
    }
    .create--workspace {

        &__wrap {
            cursor: pointer;
        }
        &__img {
            background: transparent;
            border: 1px solid rgba(193, 163, 249, 0.25);
            box-shadow: 0 0.03px .1px 0 rgba(0, 0, 0, 0.12);
            // background-color: #fff;
            span {
                margin-right: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
        }
    }
    .menu__wrap--icon {
        border: 1px solid red;
        height: 24px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1000;
        top: 8px;
        opacity: 0;
        right: 8px;
        transition: opacity .4s;

        &.show {
            opacity: 1;
        }
    }

    .dropdown--menu {
        max-width: 500px;
        min-width: 180px;
        font-size: 14px;
        left: 0 !important;
        z-index: 99999;
        position: absolute;
        will-change: transform;
        top: 0px;
        left: 0px;
        // transform: translate3d(0px, -116px, 0px);
        right: auto;
    left: 0;
    z-index: 1000;
    float: left;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
        // inset: unset !important;
        // right: unset !important;
    }
    .theme-display--preview {
        border-radius: 3px;
        height: 24px;
        width: 24px;
        background: antiquewhite;
        margin-right: 5px;
    }
    .dropdown__item__link {
        padding: 8px 10px 8px 10px;
    }
</style>