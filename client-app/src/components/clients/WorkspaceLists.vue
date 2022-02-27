<template>
    <div style="height: 100%; padding-right: 50px; padding-left: 50px; padding-top: 1rem">
          <!-- boards functionalities header -->
        <div class="flex align-center justify-content-between mt--20">
            <div class="btn--outline__sm flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
               <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #5e6c84;transform: ;msFilter:;">
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                    </svg>
               </span>
                <span>Add task</span>
            </div>
            <div class="flex">
                <span class="form__item mr--15 mb--0 justify-content-end flex" style="min-width: 30%">
                    <div class="input-group input-group-sm flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">@</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
                    </div>
                </span>
                <span class="flex align-center">
                    <span class="form__item">
                        <label for="" class="label__filter mt--0">Filter by</label>
                    </span>
                </span>
            </div>
        </div>
        <!-- table -->
        <div class="mt--40 mb--20">
        <table class="table">
            <!-- if user selects no task -->
            <template>
                <thead>
                    <tr>
                        <th scope="col" v-for="(item) in columns" :key="item.id">
                            <span v-if="item.isComponent !== null && item.isComponent !== undefined">
                                <div class="checkbox">
                                    <input type="checkbox" id="label_all" class="checkbox__input" v-model="v">
                                    <label for="label_all" class="checkbox__label no&#45;&#45;padding__all"></label>
                                </div>
                            </span>
                            <span class="table--head--text" v-if="item.name">{{ item.name }}</span>
                            <span class="table--head--icon" v-if="item.isComponent === null">
                                <div class="btn-group">
                                    <div role="button" aria-label="Show sort options" aria-expanded="false" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #6f7782;transform: ;msFilter:;">
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                        </svg>
                                    </div>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href="#">Sort A - Z</a></li>
                                        <li><a class="dropdown-item" href="#">Sort Z - A</a></li>
                                    </ul>
                                </div>
                            </span>
                        </th>
                    </tr>
                </thead>
            </template>
            <!-- if user selects at least one task -->
            <template>
                <thead>
                    <tr>
                        <th scope="col">
                            <span>
                                2 selected
                            </span>
                        </th>
                        <th scope="col">
                            <span class="table--head--text">Assign</span>
                        </th>
                        <th scope="col">
                            <span class="table--head--icon">
                               Delete
                            </span>
                        </th>
                    </tr>
                </thead>
            </template>
            <tbody>
                <tr>
                    <th scope="row">
                        <div class="checkbox">
                            <input type="checkbox" :id="'label' + index" :value="index" class="checkbox__input" />
                            <label :for="'label' + index" class="checkbox__label"></label>
                        </div>
                    </th>
                    <td class="table--body--text">
                        <span>Mark</span>
                    </td>
                    <td class="table--body--text">Otto</td>
                    <td class="table--body--text">@mdo</td>
                    <td class="table--body--text">
                        <div>
                            <div class="btn-group" style="display: block; width: 100%;">
                                <div role="button" style="display: flex; width: 100%; justify-content: space-between;" aria-label="Show sort options" aria-expanded="false" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                    <span>...</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #6f7782;transform: ;msFilter:;">
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li class="badge-dropdown-list" style="display: flex; justify-content: center;"><span class="dropdown-item">...</span></li>
                                    <li class="badge-dropdown-list">
                                        <div class="dropdown-item">
                                            <span class="dropdown-item badge rounded-pill bg-high">High</span>
                                        </div>
                                    </li>
                                    <li class="badge-dropdown-list">
                                        <div class="dropdown-item">
                                            <span class="dropdown-item badge rounded-pill bg-medium">Medium</span>
                                        </div>
                                    </li>
                                    <li class="badge-dropdown-list">
                                        <div class="dropdown-item">
                                            <span class="dropdown-item badge rounded-pill bg-low">Low</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td class="table--body--text">
                        <div>
                            <div class="btn-group" style="display: block; width: 100%;">
                                <div role="button" style="display: flex; width: 100%; justify-content: space-between;" aria-label="Show sort options" aria-expanded="false" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                    <span>...</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #6f7782;transform: ;msFilter:;">
                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li ><span class="dropdown-item" href="#">...</span></li>
                                    <li><span class="dropdown-item" href="#">To-do</span></li>
                                    <li><span class="dropdown-item" href="#">In progress</span></li>
                                    <li><span class="dropdown-item" href="#">On hold</span></li>
                                    <li><span class="dropdown-item" href="#">Requires fixes</span></li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="view-details">View</span>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>

        <!-- create list modal -->
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create a new task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                  <div class="modal__lists-icon flex align-items-center justify-content-end" style="padding-top: 1rem;">
                       <span class="text--sm text--color-normal mr--15 text--bold">Make public</span>
                       <span>
                           <icon-svg fill="#6f7782" class="nav__icon mr--10"  name="file"  :width="'16px'" :height="'16px'" />
                       </span>
                       <span>
                            <icon-svg fill="#6f7782" class="nav__icon mr--10"  name="link" :width="'16px'" :height="'16px'" />
                       </span>
                       <span>
                           <icon-svg fill="#6f7782" class="nav__icon mr--10" name="dots-horizontal-rounded"  :width="'16px'" :height="'16px'" />
                       </span>
                   </div>
                <div class="modal-body">
                   <div class="modal__lists--form" style="margin-top: 1rem;">
                       <div class="mb-3">
                            <label for="title" class="form-label text--xs">Title</label>
                            <input type="email" class="form-control form-control-sm" id="title">
                        </div>
                        <div class="mb-3">
                            <label for="title" class="form-label text--xs">Assignee</label>
                            <select class="form-select text--xs" aria-label="Default select example">
                                <option selected class="text--xs">Open this select menu</option>
                                <option value="1" class="text--xs">One</option>
                                <option value="2" class="text--xs">Two</option>
                                <option value="3" class="text--xs">Three</option>
                            </select>
                        </div>
                        <div class="flex align-items-center mb--15">
                            <div class="flex">
                                <p class="text--xs mb--0 mr--15">Due date</p>
                                <!-- <input type="email" class="form-control" id="title"> -->
                            </div>
                            <div class="">
                                <div class="btn-group" style="display: block; width: 100%;">
                                    <div role="button" style="width: 100%;" aria-label="Show sort options" aria-expanded="false" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                        <span class="text--xs">Priority</span>
                                        <span class="text--xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #6f7782;transform: ;msFilter:;">
                                                <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li class="badge-dropdown-list" style="display: flex; justify-content: center;"><span class="dropdown-item">...</span></li>
                                        <li class="badge-dropdown-list">
                                            <div class="dropdown-item">
                                                <span class="dropdown-item badge rounded-pill bg-high">High</span>
                                            </div>
                                        </li>
                                        <li class="badge-dropdown-list">
                                            <div class="dropdown-item">
                                                <span class="dropdown-item badge rounded-pill bg-medium">Medium</span>
                                            </div>
                                        </li>
                                        <li class="badge-dropdown-list">
                                            <div class="dropdown-item">
                                                <span class="dropdown-item badge rounded-pill bg-low">Low</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                         <div class="mb-3">
                            <label for="description" class="form-label text--xs">Summary</label>
                            <input type="email" class="form-control form-control-sm" id="title">
                        </div>
                   </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import IconSvg from '../icons/Icon-Svg.vue';
import { columns } from './columns';

export default {
    name: 'WorkspaceList',
    watch:{
    //watch for route parameter change and execute method
    },
    created() {
        this.fetchWorkspaceMembers();
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces.boards,
        isMenuItemHover: '',
        search: {
            active: false,
            value: ''
        },
        filterValue: '',
        rows: [
            { name: 'Toyota', assignee: 'Celica', due_date: 35000 },
            { name: 'Ford', assignee: 'Mondeo', due_date: 32000 },
            { name: 'Porsche', assignee: 'Boxter', due_date: 72000 }
        ],
       columns: columns,
       task: {
           status: '...'
       }
    }),
    components: {
        IconSvg,
    },
    props: ['currentWorkspaceItem'],
    computed: {
    },
    methods: {
         badgeBgColor(type) {
            if(type === 'Member') {
                return 'blue'
            } else {
                return 'green'
            }
        },
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
        fetchWorkspaceMembers() {
            const currentWorkspace = JSON.parse(localStorage.getItem("workspaceDetails"));
            if(currentWorkspace.members) {
                this.members = currentWorkspace.members;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        padding: 0 !important;
    }
    th, td, .dropdown-item {
        font-size: 14px;
    }
    .table--head--icon, .view-details {
        float: right;
    }
    .table--head--text {
        color: #6f7782;
    }
    .view-details {
        color: #6f7782;
        border: 1px solid #cbd4db;
        font-size: 12px;
        height: 28px;
        line-height: 28px;
        padding: 0 8px;
        border-radius: 6px;
        cursor: pointer;
    }
    .table--body--text {
        vertical-align: middle;
    }
    .table>:not(:last-child)>:last-child>*  {
        border-color: inherit;
    }
    .bg-high {
        background-color: #ff9cb1;
        color: #990f14;
    }
    .bg-medium {
        background-color: #6296f1;
        color: #f7f8f9;
    }
    .bg-low {
        background-color: #ffba34;
        color: #805808;
    }
    .dropdown-item.badge {
        width: fit-content;
        font-size: 12px;
    }
    .badge-dropdown-list {
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
        cursor: pointer;

        .dropdown-item {
            display: flex;
            justify-content: center;
        }
    }
</style>