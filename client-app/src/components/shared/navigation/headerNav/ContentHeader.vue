<template>
 <div>
      <div class="content--header">
        <div class="content--header__left" style="display: flex; align-items: center;">
            <div class="collapse--content">
            </div>
        <div class="workspace--header__title">
        <!-- workspace -->
           <template v-if="getRouterName === 'projectDetails'">
                <nav aria-label="breadcrumb" class="mt--20 ml--20">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item text--sm"><a href="#"></a>
                            <router-link :to="{ name: 'projects-view' }" class="text--sm">  
                                    Projects
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active text--sm" aria-current="page">Single project name</li>
                    </ol>
                </nav>
           </template>
            <template v-if="getRouterName === 'createInvoice'">
                <!-- Go back to invoices -->
                <div>
                    <router-link :to="{ name: 'invoices-view' }" tag="div" class="page__back--wrap">
                        <div class="page__back--icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #5469d4;transform: ;msFilter:;">
                                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                            </svg>
                        </div>
                        <div class="page__back--text">Invoices</div>
                    </router-link>
                </div>
           </template>
        </div>
    </div>

    <div class="content--header__right">
        <div class="header__create" v-if="showHeaderActionButton">
            <button class="btn btn--primary header__btn" data-bs-toggle="modal" :data-bs-target="getMatchingModal">   
                <icon-svg 
                    fill="#fff" 
                    name="add" 
                    icon-position="left"
                    :width="'12px'"
                />  
                <span class="text">Add new {{ getRouterName }}</span>
            </button>
        </div>
        <div class="header__create" style="height: 100%; display: flex; justify-content: center; align-items: center;">
            <icon-svg 
                fill="rgb(52, 69, 99)" 
                name="info" 
                icon-position="left"
                :width="'1.5rem'"
                :styles="iconStyles"
            />  
        </div>
        <div class="dropdown">
            <div class="dropdown-toggle cursor-pointer dropdown-toggle--profile" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
               <div class="avatar profile--avatar">
                    UA
                </div>
            </div>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                    <div class="profile__bio align-items-center mt--10 dropdown-item dropdown-custom-item">
                        <span>
                            <div class="profile__bio--avatar avatar cursor-text">
                                UA
                            </div>
                        </span>
                        <span>
                            <p class="profile__bio--sub cursor-text avatar--text">Uzoamaka Anyanwu</p>
                            <p class="profile__bio--sub cursor-text avatar--text">amakadarosie@gmail.com</p>
                        </span>
                    </div>
                </li>
                <li>
                    <div class="profile__item__link dropdown-item dropdown-custom-item">
                        <a class="profile__bio--title">Personal Settings</a>
                    </div>
                </li>
                <li>
                    <div class="profile__item__link dropdown-item dropdown-custom-item">
                        <a class="profile__bio--title">Explore the dashboard</a>
                    </div>
                </li>
                <li>
                    <div class="profile__item__link dropdown-item dropdown-custom-item">
                        <p class="profile__bio--title">Sign out</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </div>
  <!-- modals -->
    <create-board-modal :toggleCreateBoardModal="toggleCreateBoardModal" :showCreateBoardModal="showCreateBoardModal"></create-board-modal>
    <create-tag-modal></create-tag-modal>
    <create-client-modal></create-client-modal>
    <create-project-modal></create-project-modal>
 </div>
</template>

<script>
// @ is an alias to /src
import IconSvg from "../../../icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../../utils/dummy';
import CreateBoardModal from '../../modals/CreateBoard.vue';
import CreateTagModal from '../../modals/CreateTag.vue';
import CreateClientModal from '../../modals/CreateClientTwo.vue';
import CreateProjectModal from '../../modals/CreateProjectTwo.vue';

export default {
  name: 'DashbaordContentHeader',
  components: {
    'icon-svg': IconSvg,
    'create-board-modal': CreateBoardModal,
    'create-tag-modal': CreateTagModal,
    'create-client-modal': CreateClientModal,
    'create-project-modal': CreateProjectModal,
  },
  created() {
  },
  data: () => ({
    dropdownIsActive: {
        workspaces: false,
        boards: false,
        user: false
    },
    iconStyles: {
    display: 'flex', 
    'align-items': 'center'
    },
    createdWorkspaces: createdWorkspaces,
    showCreateBoardModal: false,
    currentWorkspaceName: '',
  }),
  computed: {
    getRouterName() {
        const routeName = this.$route.name;
        const routeNameMap = {
            'home-view': 'home',
            'projects-view': 'project',
            'clients-view': 'client',
            'settings-view': 'settings',
            'tags-view': 'tag',
            'teams-view': 'team',
            'invoices-view': 'invoice',
             'project-details': 'projectDetails',
             'create-invoice-view': 'createInvoice',
        }
        if (routeName) {
            return routeNameMap[routeName]
        } else {
            return null
        }
    },
    getMatchingModal() {
        const routeName = this.$route.name;
        const modalNameMap = {
            'home-view': 'home',
            'projects-view': 'createProject',
            'clients-view': 'createClient',
            'settings-view': 'settings',
            'tags-view': 'createTag',
            'teams-view': 'createTag',
            'invoices-view': 'createTag',
            'project-details': 'projectDetails'
        }
        if (routeName) {
            return `#${modalNameMap[routeName]}`
        } else {
            return null
        }
    },
    showHeaderActionButton() {
        if (
            this.getRouterName !== 'home' && 
            this.getRouterName !== 'settings' && 
            this.getRouterName !== 'projectDetails' && 
            this.getRouterName !== 'null'
        ) {
            return true
        } else {
            return false
        }
    }
  },
   watch:{
    //watch for route parameter change and execute method
        '$route': 'getRouterName',
        '$route': 'getCurrentWorkspaceName'
    },
  methods: {
     getPath() {
        const routePath = this.$route.path;
        // console.log(routePath);
        if (routePath.includes('workspaces') && routePath.includes('lists')) {
            return 'lists'
        } else {
            return 'none'
        }
    },
    getCurrentWorkspaceName() { 
        if(!JSON.parse(localStorage.getItem('workspaceDetails'))) {
            console.log('ll');
            return ''
        } else {
            console.log(JSON.parse(localStorage.getItem('workspaceDetails')));
            this.currentWorkspaceName = JSON.parse(localStorage.getItem('workspaceDetails')).name
            // return JSON.parse(localStorage.getItem('workspaceDetails')).name
        }
    },
    toggleDropdown(name, index) {
        console.log(name, index);
        var getDropdownClass = document.getElementsByClassName("dropdown");
        for (var i = 0; i < getDropdownClass.length; i++) {
            console.log(i, index);
            if(i === index) {
                console.log(i, index, name, getDropdownClass[i].id);
                // if(getDropdownClass[i])
                if(name === getDropdownClass[i].id) {
                    this.dropdownIsActive[getDropdownClass[i].id] = !this.dropdownIsActive[getDropdownClass[i].id]
                }
            }
        }
        // check if another dropdown is open
        // if(this.dropdownIsActive) {
        //     this.dropdownIsActive = false
        // }
        // if(name === getDropdownClass[index].id) {
        //     this.dropdownIsActive = false
        // }
    },
    hideDropdown() {
        this.dropdownIsActive['workspaces'] = false;
        this.dropdownIsActive['boards'] = false;
    },
    toggleCreateBoardModal(value) {
        const path = this.getRouterName
        // let's take a look at the path first
        // if (path === )
        if(value === 'show') {
            this.showCreateBoardModal = true;
        } else if (value === 'hide') {
            this.showCreateBoardModal = false;
        } else {
            this.showCreateBoardModal = false;
        }
    }
  }
}
</script>

<style lang="scss" scoped>
  .workspace--header__title {
      display: flex;
      span {
        font-size: 14px;
      }
  }
  .nav--dropdown--text {
      display: flex;
      align-items: center;

    span {
        display: flex;
    }
  }
  .dropdown__content--group--avatar {
      .avatar-wrap {
        font-size: 18px;
        height: 40px;
        width: 40px;
        line-height: 40px;
        align-items: center;
        background-color: #DFE1E6;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border: 0;
        border-radius: 100%;
        box-sizing: border-box;
        color: #172B4D;
        display: inline-flex;
        margin-right: 12px;
    }

    .avatar--text {
        &:first-of-type {
            margin-top: 4px;
            max-width: 230px;
        }
        &:last-of-type {
            font-size: 9pt;
            color: #B3BAC5;
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 230px;
        }
    }
  }
    ul.breadcrumb {
        list-style: none;
    }
    ul.breadcrumb li {
        display: inline;
    }
    ul.breadcrumb li+li:before {
        padding: 0px 3px 0px 8px;
        color: black;
        content: "/\00a0";
    }
    ul.breadcrumb li a, ul.breadcrumb li span {
        text-decoration: none;
        // color: #6B778C !important;
        color: rgb(23, 43, 77);
        height: auto;
        line-height: inherit;
        padding: 0;
        vertical-align: baseline;
        width: auto;
        font-size: 0.8rem;
    }
    ul.breadcrumb li a:hover {
        color: #0275d8;
        text-decoration: underline;
    }
</style>
