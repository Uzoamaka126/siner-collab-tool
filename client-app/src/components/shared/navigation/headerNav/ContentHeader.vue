<template>
 <div>
      <div class="content--header">
    <div class="content--header__left">
        <div class="collapse--content">
            <!-- <template>
                <icon-svg 
                    fill="rgb(210, 144, 52)" 
                    class="nav__icon" 
                    name="arrow-from-left" 
                    icon-position="left"
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'1.5rem'"
                />  
            </template>  -->
        </div>
        <div class="workspace--header__title">
        <!-- workspace -->
           <template v-if="getRouterName === 'boards'">
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
                <div class="dropdown dropdown--lg" :class="{ 'active' : dropdownIsActive.workspaces }" id="workspaces">
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
        </div>
    </div>
    <div class="content--header__right">
        <div class="header__create">
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
        <div class="header__create header__create--avatar" v-click-outside="hideDropdown">
            <div class="content--header__avatar" @click="toggleDropdown('user', 2)">
                <div class="avatar-wrap avatar">
                    UA
                </div>
            </div>
            <!-- dropdown content -->
            <div class="dropdown dropdown--avatar" :class="{ 'active' : dropdownIsActive.user }" :style="{ }" id="user">
                <div class="dropdown__content">
                     <div class="dropdown__content--group dropdown__content--group--avatar" style="padding-left: 1rem;">
                       <div class="flex align-items-center mt--10">
                            <span>
                            <div class="avatar-wrap avatar cursor-text">
                                UA
                            </div>
                            </span>
                            <span>
                                <p class="cursor-text avatar--text">Uzoamaka Anyanwu</p>
                                <p class="cursor-text avatar--text">amakadarosie@gmail.com</p>
                            </span>
                       </div>
                    </div>
                    <div class="dropdown__content--group dropdown__content--group--avatar" style="padding-left: 1rem;">
                        <span>
                            <div class="dropdown__item__link">
                                <a class="title">Personal Settings</a>
                            </div>
                        </span>
                    </div>
                    <div class="dropdown__content--group dropdown__content--group--avatar" style="padding-left: 1rem;">
                        <span>
                            <div class="dropdown__item__link">
                                <a class="title">Explore the dashboard</a>
                            </div>
                        </span>
                    </div>
                    <div class="dropdown__content--group dropdown__content--group--avatar" style="padding-left: 1rem;">
                        <span>
                            <div class="dropdown__item__link">
                                <p class="title">Sign out</p>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
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
    'create-board-modal': CreateBoardModal
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
  }),
  computed: {
      getRouterName() {
        const routePath = this.$router.options.history.location.slice(11);
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
      }
  },
  props: [""],
  methods: {
    toggleDropdown(name, index) {
        var getDropdownClass = document.getElementsByClassName("dropdown");
        for (var i = 0; i < getDropdownClass.length; i++) {
            if(i === index) {
                // console.log(i, index, name, getDropdownClass[i].id);
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
  .home {
    height: 100%;
  }
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
</style>
