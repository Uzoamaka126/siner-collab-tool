<template>
    <nav class="nav nav--sidebar">
        <!-- Navigation Section //random-->
        <div class="nav__section">
            <!-- Navigation Section content -->
            <div class="nav__section__content">
                <div class="nav__section__content__group no--padding__all">
                    <!-- navigation item -->
                    <div class="nav__item">
                        <div class="nav__item__logo">
                            <siner-logo :layout="'center'"></siner-logo>
                            <span class="nav--logo__text">Siner</span>
                        </div>
                    </div>
                </div>

                <div class="nav__section__content__links">
                    <!-- <barter-navigation v-if="userSubdomain === barterUG"></barter-navigation>
                    <amadeus-navigation v-else-if="userSubdomain === amadeusUG"></amadeus-navigation>
                    <bank-navigation v-else-if="userSubdomain === wemaUG"></bank-navigation> -->
                    <div class="nav__section__content__group">
                    <!--<div class="nav__section__content__group">-->
                        <div class="nav__section__content__group__title">APPROVALS</div>
                        <!-- navigation item -->
                        <div class="nav__item">
                            <!-- navigation item link -->
                            <!-- <router-link :to="{name:'pending-approval'}" class="nav__item__link nav__item__link--flex">
                                <span class="nav__item__link__text">Actions Pending Approval</span>
                            </router-link> -->
                        </div>
                    </div>

                    <!--some temp check to not show settings for cbn audit role-->
                    <div class="nav__section__content__group">
                        <!-- navigation item -->
                        <div class="nav__item">
                            <!-- navigation item link -->
                                <!-- navigation item link text -->
                            <!-- <router-link :to="{name:'dashboard-settings'}" class="nav__item__link nav__item__link--flex">
                                <span class="nav__item__link__text">Settings</span>
                            </router-link> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Logo from '../Logo.vue';

export default {
    name: 'SideBarLayout',
   components: {
    'siner-logo': Logo
  },
    data: () => ({
        showOnboardingModal: false,
    }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
