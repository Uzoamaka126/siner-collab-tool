<template>
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
        <!-- others -->
        <div class="workspace--header__title">
           <div class="row__item positionRelative" v-click-outside="hideDropdown">
                <span class="pull--right cursor-pointer nav--dropdown--text"  @click="dropdownIsActive = !dropdownIsActive">
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
                <div class="dropdown dropdown--lg" :class="{ 'active' : dropdownIsActive }">
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

            <span> > </span>

            <!-- <div class="row__item positionRelative" v-click-outside="hideDropdown">
                <span class="pull--right">
                    <button class="btn btn--sm btn--bgOrange" @click="dropdownIsActive = !dropdownIsActive">Board name here</button>
                </span>
                <div class="dropdown dropdown--sm" :class="{ 'active' : dropdownIsActive }">
                    <div class="dropdown__item" data-toggle="modal" data-target="#addSingleRates">
                        <div class="dropdown__item__link">Single rates</div>
                    </div>
                    <div class="dropdown__item hide" data-toggle="modal" data-target="#copyExistingRates">
                        <div class="dropdown__item__link">Copy existing rates</div>
                    </div>
                    <div class="dropdown__item">
                        <div class="dropdown__item__link">Bulk upload</div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <div class="content--header__right">
        <div class="header__create">
            <button class="btn btn--primary content--header--btn">
                Create
            </button>
        </div>
        <div class="header__create" style="height: 100%; display: flex; justify-content: center; align-items: center;">
            <icon-svg 
                fill="rgb(52, 69, 99)" 
                name="info" 
                icon-position="left"
                :width="'1.5rem'"
                style="{ display: flex; align-items: center }"
            />  
        </div>
        <div class="header__create">
            <div class="content--header__avatar">
                <div class="avatar-wrap avatar">
                    UA
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import IconSvg from "../../icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../utils/dummy'

export default {
  name: 'DashbaordContentHeader',
  components: {
    'icon-svg': IconSvg,
  },
  data: () => ({
      dropdownIsActive: false,
      createdWorkspaces: createdWorkspaces
  }),
  props: [""],
  methods: {
    hideDropdown() {
        alert("lllll")
        this.dropdownIsActive = false;
    },
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;
  }
  .workspace--header__title {
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
</style>
