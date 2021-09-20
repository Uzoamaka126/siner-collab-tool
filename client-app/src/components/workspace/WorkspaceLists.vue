<template>
    <div style="height: 100%; padding-right: 50px; padding-left: 50px; padding-top: 1rem">
          <!-- boards functionalities header -->
        <div class="flex align-center justify-content-between mt--20">
            <div class="form__item mr--15 mb--0 justify-content-end" style="min-width: 30%">
                <input 
                    style="padding-top: 6px; padding-bottom: 6px;" 
                    class="" v-model="search.value" 
                    placeholder="Search members by name" 
                />
            </div>
            <div class="flex align-center">
                <span class="form__item">
                    <label for="" class="label__filter">Filter by</label>
                    <vue-select class="text--sm" :options="['type']" v-model="filterValue"> </vue-select>
                </span>
            </div>
        </div>
        <!-- table -->
        <div class="mt--40 mb--20">
            <table-lite
                :has-checkbox="true"
                :is-loading="table.isLoading"
                :is-re-search="table.isReSearch"
                :columns="table.columns"
                :rows="rows"
                :total="table.totalRecordCount"
                :sortable="table.sortable"
                :messages="table.messages"
                @do-search="doSearch"
                @is-finished="tableLoadingFinish"
                @return-checked-rows="updateCheckedRows"
            ></table-lite>
        </div>
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import IconSvg from '../icons/Icon-Svg.vue';

export default {
    name: 'WorkspaceList',
    watch:{
    //watch for route parameter change and execute method
    },
    created() {
        this.fetchWorkspaceMembers();
    },
    beforeMount() {
        this.cols = [
            { field: 'make', sortable: true, filter: true },
            { field: 'model', sortable: true, filter: true },
            { field: 'price', sortable: true, filter: true }
        ];

        this.rows = [
            { make: 'Toyota', model: 'Celica', price: 35000 },
            { make: 'Ford', model: 'Mondeo', price: 32000 },
            { make: 'Porsche', model: 'Boxter', price: 72000 }
        ];
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces.boards,
        isMenuItemHover: '',
        search: {
            active: false,
            value: ''
        },
        filterValue: '',
        cols: null,
        rows: null,
        table: {
            isLoading: false,
            isReSearch: false,
            columns: [
                {
                    label: "ID",
                    field: "id",
                    width: "3%",
                    sortable: true,
                    isKey: true,
                },
                {
                    label: "Name",
                    field: "name",
                    width: "10%",
                    sortable: true,
                    display: function (row) {
                        return (
                        '<a href="#" data-id="' + row.user_id + '" class="name-btn">' + row.name + "</button>"
                        );
                    },
                },
                {
                    label: "Email",
                    field: "email",
                    width: "15%",
                    sortable: true,
                },
                {
                    label: "",
                    field: "quick",
                    width: "10%",
                    display: function (row) {
                        return (
                        '<button type="button" data-id="' + row.user_id + '" class="quick-btn">Button</button>'
                        );
                },
            },
            ],
            totalRecordCount: 2,
            sortable: {
                order: "id",
                sort: "asc",
            },
            messages: {
                pagingInfo: "Showing {0}-{1} of {2}",
                pageSizeChangeLabel: "Row count:",
                gotoPageLabel: "Go to page:",
                noDataAvailable: "No data",
            },
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
    .vue-select {
        border: 1px solid rgba(194, 200, 212, 1);
    }
    .card {
        padding: 0 !important;
    }
     .dataTables_wrapper .row {
        padding: 0 !important;
        margin-right: auto !important;
        margin-left: auto !important;
    }
</style>