<template>
    <div>
        <div style="height: 100%; padding-right: 25px; padding-left: 25px; padding-top: 2rem">
            <!-- top header -->
            <div class="flex align-items-center justify-content-between">
                <!-- project count -->
                <div class="list--count">
                    <p>{{ projects.length }} project{{ projects.length > 1 ? 's' : '' }}</p>
                </div>
                <div class="flex align-items-center">
                    <main-filter />
                    <sort-filter :filter="displayType" @setType="setDisplayType" />
                </div>
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
                            <th class="header">No. of Tasks</th>
                            <th class="header">No. of Invoices</th>
                            <th class="header"></th>
                        </tr>
                    </thead>
                    <tbody v-for="project in projects" :key="project.id">
                        <span>
                            <td class="flex align-items-center">
                                <span class="project--item__dot" :style="{ 'background-color': project.color }"></span>
                                <span>{{ project.title }}</span>
                                </td>
                            <td>{{ project.client }}</td>
                            <td>{{ project.status }}</td>
                            <td>{{ formatProjectDateTime(project.time) }}</td>
                            <td>{{ project.tasks }}</td>
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
        <confirm-deletion-modal :type="'project'" :action="handleDeleteProject" :reset="resetSelectedProject" />
    </div>
</template>

<script>
import CreateProjectModal from '../shared/modals/CreateProject'
import MainFilter from '../shared/filter/Main';
import SortFilter from '../shared/filter/Sort';
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion';
import { formatDateTime } from '../../utils/others'


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
        ConfirmDeletionModal,
        SortFilter
    },
    data () {
        return {
            showCreateBoardModal: false,
            projects: [
                {
                    id: '1',
                    title: 'Twitter Landing page',
                    client: 'Twitter',
                    status: 'pending',
                    time: new Date('Sun Mar 31 2022 21:25:37 GMT+0100 (West Africa Standard Time)'),
                    tasks: 6,
                    invoices: ["https:///", 'htps:///www'],
                    color: '#d94182'
                },
                {
                    id: '2',
                    title: 'Netlify Deployment',
                    client: 'Netlify',
                    status: 'pending',
                    time: new Date('Thu Mar 10 2022 21:25:37 GMT+0100 (West Africa Standard Time)'),
                    tasks: 10,
                    invoices: ["https:///", 'htps:///www'],
                    color: '#9e5bd9'
                }
            ],
            displayType: 'A - Z',
            page: {
                isLoading: 'default',
                hasNoProjects: false,
                pageNumber: 1,
                totalPages: 1,
                total: 0,
            },
            filterDataObject: {
                 status: {
                    types: {
                        "pending": "Pending", 
                        "on-hold": 'OnHold',
                        'completed': 'Completed'
                    },
                    selected: [],
                },
                clientName: undefined,
                projectTitle: undefined
            },
            project: {}
        }
    },
    computed: {
        // computeProjectList() {
        //     if(this.displayType && this.displayType === 'A - Z') {

        //     }
        // },
        // isFiltered() {
        //     return objectIsEmpty( this.$route.query ) === false;
        // },
    },
    methods: {
        buildQueryParams(query = {}) {
            return {
                status: query.status || (this.filter.cardStatus.selected.length === 1 ? this.filter.cardStatus.selected.join(",") : undefined),                
                clientName: query.clientName || this.filter.clientName,
                projectTitle: query.projectTitle || this.filter.projectTitle,
                page: query.page || this.page.pageNumber,
            }
        },

        updateFilterDataObj(query) {
            switch (query) {
                case query.status:
                    this.filter.status.selected = query.status.split(",");
                case query.clientName:
                    this.filter.clientName = query.clientName;
                case query.projectTitle:
                    this.filter.projectTitle = query.projectTitle;
            }
        },
        formatProjectDateTime(date) {
            if(date) {
                return formatDateTime(date)
            } else {
                return 'None'
            }
        },
        setDisplayType(val) {
            this.displayType = val
        },
        handleFetchProjects() {},
        handleDeleteProject() {},
        filterProjects () {
            const params = this.buildQueryParams();
            this.$router.replace({ name: 'projects', query: params });
        },
        sortProjects() {
            if (this.displayType === 'A - Z') {
                this.projects.sort((a, b) => {
                    var lowerName = a.title.toLowerCase(); // ignore upper and lowercase
                    var higherName = b.title.toLowerCase();

                    if (lowerName < higherName) {
                        return -1;
                    }
                    if (lowerName > higherName) {
                        return 1;
                    }

                    return 0;
                }) 
            } else {
                this.projects.sort((a, b) => {
                    var lowerName = a.title.toLowerCase(); // ignore upper and lowercase
                    var higherName = b.title.toLowerCase();

                    if (lowerName < higherName) {
                        return 1;
                    }
                    if (lowerName > higherName) {
                        return -1;
                    }

                    return 0;
                }) 
            }
        },
        resetSelectedProject() {
            this.project = {}
        }
    },
    watch: {
        displayType(newType, oldType) {
            console.log('newType', newType, 'oldType', oldType);
            console.log(newType !== oldType);
            if(newType !== oldType) {
                this.sortProjects()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .dropdown-menu {
        min-width: 5rem !important;
    }
</style>