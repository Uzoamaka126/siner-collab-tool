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
           <!-- <ag-grid-vue style="width: 500px; height: 500px;"
                class="ag-theme-alpine"
                :columnDefs="cols"
                :rowData="rows"
                rowSelection="multiple"
            >
            </ag-grid-vue> -->
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
    .vue-select {
        border: 1px solid rgba(194, 200, 212, 1);
    }
</style>