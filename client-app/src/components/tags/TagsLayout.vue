<template>
    <div>
    <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
         <!-- top header -->
        <div class="justify-content-between align-items-center" style="display: flex;">
            <div class="list--count">
                <p>{{ tags.length }} Tag{{ tags.length > 1 ? '(s)' : '' }}</p>
            </div>
            <div>
                <button class="btn btn--primary header__btn" data-bs-toggle="modal" data-bs-target="#createTag">   
                    <icon-svg 
                        fill="#fff" 
                        name="add" 
                        icon-position="left"
                        :width="'12px'"
                    />  
                    <span class="text">Add new tag</span>
                </button>
            </div>
        </div>
        <div style="display: flex; margin-top: 2.5rem;"> 
            <div style="">
                <div class="tags--project" v-for="(tag, index) in tags" :key="index">
                    <div class="tags--project-text">
                        <span class="">{{ tag }}</span>
                    </div>
                    <div class="tags--project-action">
                        <div class="icon" tabindex="-1" title="More options">
                            <svg class="css-17keszd-EnhancedContextMenuIcon e16olzom2" width="4" height="12" viewBox="0 0 4 16">
                                <path fill="#95899b" fill-rule="evenodd" d="M0 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>

    <!-- modal -->
    <create-tag-modal></create-tag-modal>
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import IconSvg from '../icons/Icon-Svg.vue';
import CreateTagModal from '../shared/modals/CreateTag.vue';

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
        showCreateBoardModal: false,
        tags: ['Finished', 'To do', 'Landing Page', 'SEO']
    }),
    components: {
        IconSvg,
        'create-tag-modal': CreateTagModal,
    },
    computed: {
    },
    methods: {
        toggleCreateProjectModal(value) {
            if(value === 'show') {
                this.showCreateProjectModal = true;
            } else if (value === 'hide') {
                this.showCreateProjectModal = false;
            } else {
                this.showCreateProjectModal = false;
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
        box-sizing: border-box;
        height: 226px;
        // min-width: 152px;
        // padding: 16px 0;
        // width: 152px;
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