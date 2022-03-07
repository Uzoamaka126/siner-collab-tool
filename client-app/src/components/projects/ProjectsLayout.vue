<template>
    <div>
        <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
            <!-- top header -->
            <div class="flex align-items-center justify-content-between">
                <!-- project count -->
                <div class="list--count">
                    <p>{{ projects.length }} project{{ projects.length > 1 ? 's' : '' }}</p>
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
                            <th class="header">Deadline</th>
                            <th class="header">Tags</th>
                            <th class="header">No. of Invoices</th>
                            <th class="header"></th>
                        </tr>
                    </thead>
                    <tbody v-for="project in projects" :key="project.id">
                        <span>
                            <td>{{ project.title }}</td>
                            <td>{{ project.client }}</td>
                            <td>{{ project.status }}</td>
                            <td>{{ project.time }}</td>
                            <td>{{ project.teamNum }}</td>
                            <td>{{ project.invoices.length }}</td>
                            <td  aria-expanded="false">
                                <div data-bs-toggle="dropdown">
                                    <div class="icon cursor-pointer" tabindex="-1" title="More options">
                                        <svg class="css-17keszd-EnhancedContextMenuIcon e16olzom2" width="4" height="12" viewBox="0 0 4 16">
                                            <path fill="#95899b" fill-rule="evenodd" d="M0 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm0-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <ul class="dropdown-menu dropdown-menu--tag" aria-labelledby="tagActions">
                                    <li class="cursor-pointer">
                                        <router-link :to="{name:'project-details', params:{ id:project.id }}" class="dropdown-item block width-100 text--xs">Edit</router-link>
                                    </li>
                                    <li class="cursor-pointer">
                                        <p class="dropdown-item text--xs text--color-warning" data-bs-toggle="modal" data-bs-target="#deleteProject">Delete</p>
                                    </li>
                                </ul>
                            </td>
                        </span>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- modal -->
        <confirm-deletion-modal :type="'project'" :action="handleDeleteProject" />
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import CreateProjectModal from '../shared/modals/CreateProject'
import MainFilter from '../shared/filter/Main';
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion';

export default {
    name: 'ProjectLayout',
    created() {
    },
    props: {
        user: Object
    },
    components: {
        CreateProjectModal,
        MainFilter,
        ConfirmDeletionModal
    },
    data () {
        return {
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
        }
    },
    computed: {
    },
    methods: {
        handleFetchProjects() {},
        handleDeleteProject() {}
    }
}
</script>

<style lang="scss" scoped>
    .dropdown-menu {
        min-width: 5rem !important;
    }
</style>