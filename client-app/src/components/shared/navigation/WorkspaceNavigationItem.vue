<template>
    <div class="nav__section__content__group ">
        <div class="nav__section--item nav__section--item--sub" style="padding-left: 0">
            <div class="workspace-link flex align-items-center cursor-pointer" @click="backToHome()" style="width: 100%;">  
                <span class="cursor-pointer ml--0">
                    <icon-svg 
                        fill="rgba(66, 82, 110)" 
                        class="nav__icon mr--0 ml--0" 
                        name="chevron-left" 
                        :style="{ fill: 'rgba(66, 82, 110)' }"
                        :width="'0.8rem'"
                    /> 
                </span>
                <span class="nav__section__content__group__title cursor-pointer ml--0" style="text-transform: none">Back to home</span>
            </div>
        </div>
        <div class="home--content__wrap">
            <div class="home--content--item">
                <span
                    class="nav__workspace--link"
                >
                    <!-- :class="{ active: activeWorkspace === item.name}" -->
                    <div class="workspace--theme--img" style="width: 24px; height: 24px; margin-right: 15px;"></div>
                    <span class="flex flex-column">
                        <span class="text--color-dark text--sm text--bold mt--5">{{ workspaceDetails.name }}</span>
                        <span class="text--xs text--normal text--color-normal" style="margin-top: 3px;">{{ workspaceDetails.type }}</span>
                    </span>
                </span>
            </div>
            <!-- Other functionalities -->
            <div class="home--content--item">
                <span
                    class="nav__workspace--link"
                >
                    <!-- :class="{ active: activeWorkspace === item.name}" -->
                     <span class="cursor-pointer ml--0">
                    <icon-svg 
                        fill="rgba(66, 82, 110)" 
                        class="nav__icon mr--15 ml--0" 
                        name="board" 
                        :style="{ fill: 'rgba(66, 82, 110)' }"
                        :width="'24px'"
                    /> 
                </span>
                    <span class="flex flex-column">
                        <span class="workspace-nav-text text--sm mt--5">Boards</span>
                    </span>
                </span>
            </div>
            <!-- item -->
             <div class="home--content--item">
                <span
                    class="nav__workspace--link"
                >
                    <!-- :class="{ active: activeWorkspace === item.name}" -->
                     <span class="cursor-pointer ml--0">
                        <icon-svg 
                            fill="rgba(66, 82, 110)" 
                            class="nav__icon mr--15 ml--0" 
                            name="multiple-users" 
                            :style="{ fill: 'rgba(66, 82, 110)' }"
                            :width="'24px'"
                        />
                     </span>
                    <span class="flex flex-column">
                        <span class="workspace-nav-text text--sm mt--5">Members</span>
                    </span>
                </span>
            </div>
            <!-- item -->
             <div class="home--content--item">
                <span
                    class="nav__workspace--link"
                >
                    <!-- :class="{ active: activeWorkspace === item.name}" -->
                    <span class="cursor-pointer ml--0">
                        <icon-svg 
                            fill="rgba(66, 82, 110)" 
                            class="nav__icon mr--15 ml--0" 
                            name="notes" 
                            :style="{ fill: 'rgba(66, 82, 110)' }"
                            :width="'24px'"
                        />
                     </span>
                    <span class="flex flex-column">
                        <span class="workspace-nav-text text--sm mt--5">Meeting notes</span>
                    </span>
                </span>
            </div>
            <!-- item -->
             <div class="home--content--item">
                <span
                    class="nav__workspace--link"
                >
                    <!-- :class="{ active: activeWorkspace === item.name}" -->
                     <span class="cursor-pointer ml--0">
                        <icon-svg 
                            fill="rgba(66, 82, 110)" 
                            class="nav__icon mr--15 ml--0" 
                            name="sheet" 
                            :style="{ fill: 'rgba(66, 82, 110)' }"
                            :width="'24px'"
                        />
                     </span>
                    <span class="flex flex-column">
                        <span class="workspace-nav-text text--sm mt--5">Product requirements</span>
                    </span>
                </span>
            </div>
            <!-- item -->
             <div class="home--content--item">
                <span
                    class="nav__workspace--link"
                >
                    <!-- :class="{ active: activeWorkspace === item.name}" -->
                     <span class="cursor-pointer ml--0">
                        <icon-svg 
                            fill="rgba(66, 82, 110)" 
                            class="nav__icon mr--15 ml--0" 
                            name="settings-2" 
                            :style="{ fill: 'rgba(66, 82, 110)' }"
                            :width="'24px'"
                        />
                     </span>
                    <span class="flex flex-column">
                        <span class="workspace-nav-text text--sm mt--5">Settings</span>
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import IconSvg from "../../icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../utils/dummy'

export default {
    name: 'WorkspaceItemNavigation',
     watch:{
        //watch for route parameter change and execute method
        '$route': 'clearOnUnMount',
    },
    components: {
        'icon-svg': IconSvg
    },
    created() {
        console.log(this.$route.path);
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces,
        activeWorkspace: '',
        workspaceDetails: JSON.parse(localStorage.getItem("workspaceDetails"))
    }),
    computed: {
        computeCreatedWorkspaces () {
            return this.createdWorkspaces.slice(0, 2)
        },
    },
    methods: {
        clearOnUnMount() {
            const path = this.$route.path;
            if (!path.includes('workspaces/')) {
                this.activeWorkspace = ''
            } 
        },
        backToHome() {
            this.$router.push({ name: 'home-view'})
            localStorage.setItem('showWorkspaceNav', false)
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .nav__workspace--link {
        padding: 10px;
        display: flex;
        align-items: center;

        &.active {
            color: #5750ec;
            font-weight: 600;
            background-color: #e4e9fd;
        }
    }
    .nav__section__content__group {
        overflow-x: scroll;
    }
    .home--content {
        &__wrap {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0;
        padding-left: 0;

        }
        &--item  {

            &:not(:first-of-type) {
                cursor: pointer;
                &:hover {
                    color: #5750ec;
                    font-weight: 600;
                    background-color: #e4e9fd;
                }
            }
        }
    }
    .workspace {
        &--theme--img {
            width: 1rem;
            height: 1rem;
        }
        &-nav-text {
            font-weight: 400 !important;
            color: #212b36;
        }
        &-link.active {
            span {
                color: #5750ec;
                font-weight: 600;
            }
        }
    }
</style>
