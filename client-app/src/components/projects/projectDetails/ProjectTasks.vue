<template>
    <div>
        <!-- boards functionalities header -->
        <div class="align-items-center justify-content-between" style="display: flex;">
            <div class="btn--outline__sm align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal" style="display: flex;">
               <span class="flex ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #5e6c84;transform: ;msFilter:;">
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                    </svg>
               </span>
                <span>Add task</span>
            </div>
            <!-- others -->
            <div class="flex align-items-center justify-content-between">
                <div class="filter__actions--list">
                    <!-- search list -->
                    <form class="bd-search position-relative" style="margin-right: 0.5rem;">
                        <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
                            <input 
                                type="search" 
                                class="form-control" 
                                id="search-input" 
                                placeholder="Search clients..." 
                                aria-label="Search docs for..." 
                                autocomplete="off" 
                                data-bd-docs-version="5.1" 
                                spellcheck="false" 
                                role="combobox" 
                                aria-autocomplete="list" 
                                aria-expanded="false" 
                                aria-owns="algolia-autocomplete-listbox-0" dir="auto" 
                                style="position: relative; vertical-align: top; font-size: 12px; padding-left: 2rem;"
                            >
                                <span role="listbox" id="algolia-autocomplete-listbox-0" style="position: absolute; top: 5px; z-index: 100; left: 5px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #dee2e6;transform: ;msFilter:;">
                                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                                    </svg>
                                </span>
                        </span>
                    </form>
                </div>
            </div>
        </div>
        <!-- content -->
        <div>
            <div class="col-12 mt--40">
                <draggable 
                    v-model="tasks" 
                    group="people" 
                    @start="dragging=true" 
                    @end="dragging=false" 
                    item-key="id"
                >
                    <template #item="{element}">
                        <div class="task__completed--list">
                            <span class="task__completed__wrap">
                                <svg class="task__completed--icon" focusable="false" viewBox="0 0 32 32">
                                    <path class="outer-path" d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                    <path class="inner-path" d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z"></path>
                                </svg>
                            </span>
                            <div class="flex align-items-center width--100">
                                <!-- name -->
                                <input 
                                    class="form-control form-control-sm task__form--input" 
                                    type="text" 
                                    v-model="element.name" 
                                    @keyup="removeTaskByDeletion(element.id, element.name)"
                                    :id="element.id"
                                    style="min-width: 80%;"
                                >
                                <button class="btn--ghost text--xs text--color-warning width--100">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
import IconSvg from '../../icons/Icon-Svg.vue';
import draggable from "vuedraggable";
// import { mapState } from 'vuex';

export default {
    name: 'ProjectTasks',
    watch:{
    //watch for route parameter change and execute method
    },
    created() {
        // if(this.user && this.user.isRecentlyCreated === true) {
        //     this.setShowOnboardingModal('show');
        // }
        // console.log(this.fetchWorkspaceMembers);
    },
    data () {
        return {
            isMenuItemHover: '',
            search: {
                active: false,
                value: ''
            },
            sortValue: '',
            filterValue: '',
            members: null,
            tasks: [
                { name: "John", id: 0 },
                { name: "Joao", id: 1 },
                { name: "Jean", id: 2 }
            ],
            dragging: false,
            enabled: true,
        }
    },
    components: {
        IconSvg,
        draggable
    },
    props: ['user'],
    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        }
    },
    methods: {
        add () {
            this.list.push({ name: "Juan " + id, id: id++ });
        },
        replace () {
            this.list = [{ name: "Edgard", id: id++ }];
        },
        checkMove (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        removeTaskByDeletion(id, value) {
            var previousSibling = document.getElementById(id).previousElementSibling;
            if (value === '') {
                this.tasks = this.tasks.filter(item => item.id !== id)
                console.log(previousSibling);
                previousSibling.getElementsByTagName('input').focus
            }
        }
        // selectFocus(id, value)
    }
}
</script>

<style lang="scss">
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
