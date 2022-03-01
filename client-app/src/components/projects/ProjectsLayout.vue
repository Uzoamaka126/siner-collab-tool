<template>
    <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
         <!-- top header -->
        <div class="flex align-items-center justify-content-between">
            <!-- Client count -->
            <div class="list--count">
                <p>3 client(s)</p>
            </div>
           <main-filter />
        </div>
        <!-- Content -->
        <div style="display: flex; margin-top: 2.5rem;">
            <table class="table table-hover root">
                <thead>
                    <tr>
                        <th class="first header">Project title</th>
                        <th class="header">Client</th>
                        <th class="header">Status</th>
                        <th class="header">Time</th>
                        <th class="header">No on team</th>
                        <th class="header">Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    <router-link :to="{name:'project-details', params:{ id:project.id }}" v-for="project in projects" :key="project.id">
                        <td>{{ project.title }}</td>
                        <td>{{ project.client }}</td>
                        <td>{{ project.status }}</td>
                        <td>{{ project.time }}</td>
                        <td>{{ project.teamNum }}</td>
                        <td>{{ project.invoices.length }}</td>
                    </router-link>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import CreateProjectModal from '../shared/modals/CreateProject.vue'
import MainFilter from '../shared/filter/Main'

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
        projects: [
            {
                id: '1',
                title: 'Twitter Landing page',
                client: 'Twitter',
                status: 'pending',
                time: '0h',
                teamNum: 1,
                invoices: ["https:///", 'htps:///www']
            },
            {
                id: '2',
                title: 'Twitter Landing page',
                client: 'Twitter',
                status: 'pending',
                time: '0h',
                teamNum: 1,
                invoices: ["https:///", 'htps:///www']
            }
        ]
    }),
    components: {
        CreateProjectModal,
        MainFilter
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