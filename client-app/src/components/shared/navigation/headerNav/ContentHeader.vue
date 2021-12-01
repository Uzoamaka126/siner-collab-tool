<template>
 <div>
      <div class="content--header">
        <div class="content--header__left">
            <div class="collapse--content">
            </div>
        <div class="workspace--header__title">
        <!-- workspace -->
           <template v-if="getRouterName() === 'boards'">
                <div class="row__item positionRelative" v-click-outside="hideDropdown">
                    <span class="pull--right cursor-pointer nav--dropdown--text" @click="toggleDropdown('workspaces', 0)">
                        <span class="">Workspace name here</span>
                        <span>
                            <icon-svg 
                                fill="rgb(52, 69, 99)" 
                                name="chevron-down" 
                                icon-position="left"
                                :width="'1.5rem'"
                                style="{ display: flex; align-items: center }"
                            />  
                        </span>
                    </span>
                    <div class="dropdown-custom dropdown-custom--lg" :class="{ 'active' : dropdownIsActive.workspaces }" id="workspaces">
                    <div class="dropdown-custom__content">
                            <div class="dropdown-custom__content--group" style="padding-left: 1rem;">
                                <span>
                                    <div class="dropdown-custom__item__link" v-for="item, index in createdWorkspaces" :key="index">
                                        <p class="title">{{ item.name }}</p>
                                        <p class="sub-title">{{ item.type }}</p>
                                    </div>
                                </span>
                            </div>
                            <!-- group 2 -->
                            <div class="dropdown-custom__content--group dropdown-custom__content--group--two" style="border-top: 2px solid rgba(9,30,66,0.08);">
                                <span>
                                    <div class="">
                                        <div class="dropdown-custom__item__link">
                                            <p class="title">See all workspaces</p>
                                        </div>
                                        <div class="dropdown-custom__item__link">
                                            <p class="title">Create a new workspaces</p>
                                        </div>
                                    </div>
                                </span>
                            </div>
                    </div>
                    </div>
                </div>
            <!-- nav header divider -->
                <span class="nav--divider"> / </span>
                <!-- boards -->
                <div class="row__item positionRelative" v-click-outside="hideDropdown">
                    <span class="pull--right cursor-pointer nav--dropdown--text"  @click="toggleDropdown('boards', 1)">
                        <span class="">Board name here</span>
                        <span>
                            <icon-svg 
                                fill="rgb(52, 69, 99)" 
                                name="chevron-down" 
                                icon-position="left"
                                :width="'1.5rem'"
                                style="{ display: flex; align-items: center }"
                            />  
                        </span>
                    </span>
                    <div class="dropdown dropdown--lg" :class="{ 'active' : dropdownIsActive.boards }" :style="{ }" id="boards">
                    <div class="dropdown__content">
                            <div class="dropdown__content--group" style="padding-left: 1rem;">
                                <span>
                                    <div class="dropdown__item__link" v-for="item, index in createdWorkspaces" :key="index">
                                        <p class="title">{{ item.name }}</p>
                                        <p class="sub-title">{{ item.type }}</p>
                                    </div>
                                </span>
                            </div>
                            <!-- group 2 -->
                            <div class="dropdown__content--group dropdown__content--group--two" style="border-top: 2px solid rgba(9,30,66,0.08);">
                                <span>
                                    <div class="">
                                        <div class="dropdown__item__link">
                                            <p class="title">See all workspaces</p>
                                        </div>
                                        <div class="dropdown__item__link">
                                            <p class="title">Create a new workspaces</p>
                                        </div>
                                    </div>
                                </span>
                            </div>
                    </div>
                    </div>
                </div>
           </template>
           <template v-else-if="getRouterName() === 'workspaces'">
               <p class="text--sm">WORKSPACES</p>
           </template>
           <!-- <template v-else-if="getRouterName() === 'invites'">
               <p class="text--sm">INVITES</p>
           </template> -->
           <template v-else-if="getWorkspaceRouterPath() === 'lists'">
               <ul class="breadcrumb">
                    <li>
                        <router-link :to="{ name: 'workspaces'}" class="cursor-pointer">Workspaces</router-link>
                        </li>
                    <li><span>{{ currentWorkspaceName }}</span></li>
                </ul>
           </template>
        </div>
    </div>
    <div class="content--header__right">
        <div class="header__create" v-if="getRouterName() === 'boards' || getRouterName() !== 'settings'">
            <button class="btn btn--primary content--header--btn" @click="toggleCreateBoardModal('show')">
                Create
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
    <create-board-modal :toggleCreateBoardModal="toggleCreateBoardModal" :showCreateBoardModal="showCreateBoardModal"></create-board-modal>
 </div>
</template>

<script>
// @ is an alias to /src
import IconSvg from "../../../icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../../utils/dummy';
import CreateBoardModal from '../../modals/CreateBoard.vue';

export default {
  name: 'DashbaordContentHeader',
  components: {
    'icon-svg': IconSvg,
    'create-board-modal': CreateBoardModal,
  },
  created() {
      this.getRouterName();
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
    currentWorkspaceName: ''
  }),
  computed: {
  },
   watch:{
    //watch for route parameter change and execute method
        '$route': 'getRouterName',
        '$route': 'getCurrentWorkspaceName'
    },
  methods: {
    getRouterName() {
        const routePath = this.$route.path.slice(11);
        // console.log(routePath);
        if (routePath === 'home') {
            return 'home'
        } else if(routePath === 'boards') {
            return 'boards'
        } else if(routePath === 'workspaces') {
            return 'workspaces'
        } else if(routePath === 'settings') {
            return 'settings'
        } else {
            return 'none'
        }
    },
     getWorkspaceRouterPath() {
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
