<template>
    <div class="nav__section__content__group ">
        <div class="nav__section--item nav__section--item--sub">
            <div class="workspace-link" :to="{name:'workspaces'}" style="min-width: 60%;">  
                <span class="nav__section__content__group__title ml--0">Operations</span>
            </div>
        </div>
        <div class="home--content__wrap">
            <router-link :to="{ name:'clients-view' }" class="nav__section--item">
                    <!-- name="layer"  -->
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    icon-position="left"
                    name="layer" 
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />   
                <span class="nav__section__content__group__title">Clients</span>
            </router-link>
            <router-link class="nav__section--item" :to="{ name:'projects-view' }">
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    name="folder" 
                    icon-position="left"
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />   
                <span class="nav__section__content__group__title">Projects</span>
            </router-link>
             <div 
                    class="nav__section--item" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="right" 
                    title="<em>Tooltip</em> <u>with</u> <b>HTML</b>"
                    data-bs-custom-class="'beautifier'"
                    data-bs-html="true"
                    data-bs-trigger="click hover"
                >
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    name="multiple-users" 
                    icon-position="left"
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />   
                <span class="nav__section__content__group__title">Teams</span>
            </div>
            <!-- Invite -->
             <router-link :to="{ name:'tags-view' }" class="nav__section--item">  
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    name="tag" 
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />
                <span class="nav__section__content__group__title">Tags</span>
            </router-link>
            <!-- Invoice -->
            <router-link :to="{ name:'invoices-view' }" class="nav__section--item">  
                <icon-svg 
                    fill="rgba(66, 82, 110)" 
                    class="nav__icon" 
                    name="receipt" 
                    :style="{ fill: 'rgba(66, 82, 110)' }"
                    :width="'24px'"
                />
                <span class="nav__section__content__group__title">Invoices</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import IconSvg from "../../icons/Icon-Svg.vue";
import { createdWorkspaces } from '../../../utils/dummy'

export default {
    name: 'OperationsNavigation',
     watch:{
        //watch for route parameter change and execute method
    },
    components: {
        'icon-svg': IconSvg,
    },
    created() {
        console.log(this.$route.path);
    },
    data: () => ({
        createdWorkspaces: createdWorkspaces,
        activeWorkspace: ''
    }),
    computed: {
        computeCreatedWorkspaces () {
            return this.createdWorkspaces.slice(0, 2)
        },
    },
    methods: {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .workspace-link.active {
        span {
            color: #5750ec;
            font-weight: 600;
        }
    }
    .nav__workspace--link {
        padding: 10px;
        display: flex;
        align-items: center;

        &.active, &:hover {
            color: #5750ec;
            font-weight: 600;
            background-color: #e4e9fd;
        }
    }
    .home--content__wrap {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0;
        padding-left: 0;
    }
    .beautifier {
        padding: 10px 15px !important;
        background: #000 !important;
        color: #f2f2f2 !important;
    }
</style>
