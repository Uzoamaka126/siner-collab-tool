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
            <span>Workspace name here</span>
            <span> > </span>
            <span>Board name here 
                <!-- dropdown button here -->
            </span>
        </div>
    </div>
    <div class="content--header__right">
        <div class="header__create">
            <button class="btn btn--primary content--header--btn">
                Create
            </button>
        </div>
        <div class="header__create">
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

export default {
  name: 'DashbaordContentHeader',
  components: {
    'icon-svg': IconSvg,
  },
  props: [""]
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
</style>
