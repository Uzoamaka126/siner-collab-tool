<template>
    <div style="height: 100%; padding-right: 50px; padding-left: 50px; padding-top: 1rem">
         <div>
            <div class="heading">
                <p class="title">
                {{ 
                    (currentWorkspaceItem.members.length === 0 || currentWorkspaceItem.members.length > 1)
                    ? currentWorkspaceItem.members.length + '' + 'Workspace Members' 
                    : currentWorkspaceItem.members.length + '' + 'Workspace Member' 
                }}
                </p>
                <p class="sub-title">Members of a workspace can view and join all boards on that workspace. They can also create new boards on the Workspace.</p>
            </div>
        </div>
        <!-- boards functionalities header -->
        <div class="flex align-center justify-content-between">
            <div class="form__item mr--15 mb--0 justify-content-end" style="min-width: 30%">
                <input 
                    style="padding-top: 6px; padding-bottom: 6px;" 
                    class="" v-model="search.value" 
                    placeholder="Search boards by name" 
                />
            </div>
            <div class="flex align-center">
                <span class="form__item mr--15 mb--0">
                    <label for="" class="label__sort">Sort by</label>
                    <vue-select 
                        class="text--sm"
                        :options="[
                            'Less Active', 
                            'Most active', 
                            'Alphabetically A - Z', 
                            'Alphabetically A - Z'
                            ]"
                            v-model="sortValue"
                    ></vue-select>
                </span>
                <span class="form__item">
                    <label for="" class="label__filter">Filter by</label>
                    <vue-select class="text--sm" :options="['type']" v-model="filterValue"> </vue-select>
                </span>
            </div>
        </div>

        <div style="display: flex; margin-top: 4rem;">
            
        </div>
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import IconSvg from '../icons/Icon-Svg.vue';
import { mapState } from 'vuex';

export default {
    name: 'WorkspaceMembers',
    watch:{
    //watch for route parameter change and execute method
    },
    created() {
        // if(this.user && this.user.isRecentlyCreated === true) {
        //     this.setShowOnboardingModal('show');
        // }
        console.log(this.workspace);
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces.boards,
        isMenuItemHover: '',
        search: {
            active: false,
            value: ''
        },
        sortValue: '',
        filterValue: ''
    }),
    components: {
        IconSvg,
    },
    props: ['currentWorkspaceItem'],
    computed: {
        ...mapState(['workspace']),
    },
    methods: {
        // getHyphenatedPath(str) {
        //     const routePath = this.$route.path.slice(22);
        //     const newPath = routePath.replace(/\s/g, "-").toLowerCase();
        // },
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
        height: 226px;
        min-width: 152px;
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
        right: auto;
        float: left;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: .25rem;
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
    .heading {
        font-size: 18px;
        line-height: 30px;

         p {
            &.title {
                font-weight: 600;
            }
            &.sub-title {
                font-size: 14px;
            }
        }
    }
</style>