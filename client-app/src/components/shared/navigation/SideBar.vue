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
                            <svg viewBox="0 0 148 27" xmlns="http://www.w3.org/2000/svg">
                                <g fill-rule="evenodd">
                                    <text fill="#FFF" font-family="ArialRoundedMTBold, Arial Rounded MT Bold" font-size="17.28" letter-spacing=".018">
                                        <tspan x="29" y="19">ControlCenter</tspan>
                                    </text>
                                    <path d="M19.827 11.462C23.555 8.609 31.224-1.585 19.241.21 14.022.95 6.353 5.65 4.81 11.039a42.684 42.684 0 0 0-2.663-4.173C.708 5.017-.943 6.444.655 8.346c4.527 5.44 7.669 11.99 7.669 18.592.373-3.275-.213-7.29-1.598-11.198a7.437 7.437 0 0 0 2.13.317c2.45 3.698 6.178 6.867 10.385 8.346 3.835 1.426 8.947.58 6.87-5.124-1.118-3.116-3.728-5.863-6.284-7.817zm.533-9.93c6.657-.687-.48 6.972-2.823 8.398-2.183-1.32-4.9-2.483-7.562-2.166 1.917-2.271 6.55-5.81 10.385-6.233zM9.92 9.453c1.811-.158 3.782.793 5.273 1.743a12.8 12.8 0 0 1-4.687 1.215c-2.45 0-2.929-2.746-.586-2.958zm9.214 11.938c-3.142-.845-6.071-3.17-8.202-5.546 1.758-.317 3.462-.951 5.06-1.849.586-.264 1.171-.634 1.704-1.004 1.864 1.585 3.781 3.698 4.527 6.075.745 2.588-1.278 2.8-3.09 2.324z" fill="#F5A623" fill-rule="nonzero"/>
                                </g>
                            </svg>
                            <!-- <img src="/static/img/amadeus-logo.png" height="20" alt="" v-else> -->
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
export default {
    name: 'SideBarLayout',
    props: {
        
    },
    data: () => ({
        showOnboardingModal: false,
    }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
