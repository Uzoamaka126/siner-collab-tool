<template>
    <div>
        <div style="height: 100%; padding-right: 50px; padding-left: 50px; padding-top: 2rem">
            <!-- top header -->
            <div class="flex align-items-center justify-content-between">
                <!-- Client count -->
                <div class="list--count">
                    <p>3 client(s)</p>
                </div>
                <div class="filter__actions--list">
                    <!-- search list -->
                    <form class="bd-search positionRelative" style="margin-right: 0.825rem;">
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
                                style="position: relative; vertical-align: top; font-size: 14px; padding-left: 2rem;">
                                <span role="listbox" id="algolia-autocomplete-listbox-0" style="position: absolute; top: 5px; z-index: 100; left: 5px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #dee2e6;transform: ;msFilter:;">
                                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                                </svg>
                            </span>
                        </span>
                    </form>
                    <button class="btn btn--primary header__btn" data-bs-toggle="modal" data-bs-target="#createClient">   
                        <icon-svg 
                            fill="#fff" 
                            name="add" 
                            icon-position="left"
                            :width="'12px'"
                        />  
                        <span class="text">Add new client</span>
                    </button>
                </div>
            </div>
            <!-- Content -->
            <div style="display: flex; margin-top: 2.5rem;">
                <div class="home--content__wrap">
                    <div class="home--content--item positionRelative" v-for="(item, index) in createdWorkspaces" :key="index">
                        <div class="list-options">
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
                            <!-- overlay contents -->
                            <div class="list__overlay">
                                <div class="list__overlay-text-wrap">
                                    <div style="display: flex; align-items: center; width: 100%; justify-content: center;" @click="setClientDetails(item)">
                                        <icon-svg 
                                            fill="rgba(194, 200, 212, 1)" 
                                            class="nav__icon mr--0" 
                                            name="edit" 
                                            icon-position="left"
                                            :width="'12px'"
                                            :height="'12px'"
                                        /> 
                                        <p class="text text--xs">Edit</p>
                                    </div>
                                    <div style="display: flex; align-items: center" @click="startDelete(item)">
                                        <icon-svg 
                                            fill="rgba(194, 200, 212, 1)" 
                                            class="nav__icon mr--0" 
                                            name="delete" 
                                            icon-position="left"
                                            :width="'12px'"
                                            :height="'12px'"
                                        /> 
                                        <p class="text text--xs">Delete</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal -->
        <create-client-modal />
        <confirm-deletion-modal :type="'client'" :action="handleDeleteClient" :reset="resetCurrentClient" />
        <client-details-modal :currentClientDetails="currentClient" :clientName="currentClient.name"  @resetCurrentClient="resetCurrentClient" />
    </div>
</template>

<script>
import { createdWorkspaces } from '../../utils/dummy'
import IconSvg from '../shared/icons/Icon-Svg.vue';
import CreateClientModal from '../shared/modals/CreateClient.vue';
import ConfirmDeletionModal from '../shared/modals/ConfirmDeletion.vue';
import ClientDetailsModal from '../shared/modals/ViewClient.vue';

export default {
    name: 'WorkspaceLayout',
    created() {
        // console.log(this.user);
        if(this.user && this.user.isRecentlyCreated === true) {
            this.setShowOnboardingModal('show');
        }
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces,
        isMenuItemHover: '',
        currentClient: {},
    }),
    components: {
        IconSvg,
        CreateClientModal,
        ConfirmDeletionModal,
        ClientDetailsModal
    },
    computed: {},
    methods: {
        showMenuIconOnHover(name) {
            if(name === null) {
                return
            } else {
                const getWorkspaceItem = this.createdWorkspaces.find(item => item.name === name)
                if (getWorkspaceItem.name) {
                this.isMenuItemHover = getWorkspaceItem.name;
                }
            }
        },
        resetCurrentClient() {
            this.currentClient = {};
            // $("#clientDetails").modal("hide");
        },
        setClientDetails(data) {
            this.currentClient = data;
            $("#clientDetails").modal("show");
        },
        startDelete(data) {
            this.currentClient = data;
            $("#deleteClient").modal("show");
        },
        handleDeleteClient() {
            this.createdWorkspaces = this.createdWorkspaces.filter(item => item.id !== this.client.id);
            this.currentClient.id = ''
             $("#deleteClient").modal("hide");
        },
        handleAddClient(data) {
            // make API call here
        },
        handleEditClient() {},
    }
}
</script>

<style lang="scss" scoped>
    .home--content__wrap {
        display: flex;
        flex-wrap: wrap;
    }
    .workspace--theme--img {
        height: 80px;
        width: 80px;
        border-radius: 10px;
    }
    .home--content--item {
        border-radius: 30px;
        box-sizing: border-box;
        height: auto;
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
</style>