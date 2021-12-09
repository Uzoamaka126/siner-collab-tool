<template>
    <div style="height: 100%">
        <div>
            <!-- title -->
           <div class="project__overview--item">
               <span class="text--color-dark text--medium">Title:</span>
                <template v-if="!isEditableTitle">
                    <span>
                        <span class="ml--10 text--sm">Test Title</span>
                        <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="toggleTitleEdit(true)">(Edit)</span>
                    </span>
                </template>
                <template v-else>
                    <span class="ml--10">
                        <span class="bd-search position-relative cursor-pointer">
                            <input 
                                type="text" 
                                class="form__input form__input--lg" 
                                v-model="title"
                                style="position: relative; vertical-align: top; font-size: 14px; padding-left: 10px;"
                            >
                            <span>
                                <span class="ml--10 text--xs text-faded cursor-pointer" @click="toggleTitleEdit(false)">Cancel</span>
                                <span class="ml--10 text--xs text--link cursor-pointer" :class="!title ? 'text--disabled' : '' ">Edit</span>
                            </span>
                        </span>
                    </span>
                </template>
           </div>
           <div class="project__overview--item" style="display: flex;">
               <span class="text--color-dark text--medium">Status:</span>
                <template v-if="!isEditableStatus">
                    <span>
                        <span class="ml--10 text--sm">Pending</span>
                        <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="toggleStatusEdit(true)">(Edit)</span>
                    </span>
                </template>
                <template v-else>
                    <span class="ml--10 align-items-center" style="display: flex; font-size: 12px;">
                        <span>
                            <select class="form-select form-select-sm" style="width: fit-content" aria-label=".form-select-sm example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </span>
                        <span>
                            <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="toggleStatusEdit(false)">Cancel</span>
                            <span class="ml--10 text--xs text--link text-faded cursor-pointer" :class="!status ? 'text--disabled' : '' ">Save</span>
                        </span>
                    </span>
                </template>
           </div>
            <div class="project__overview--item">
               <span class="text--color-dark text--medium">No of hours spent:</span>
                <span class="ml--10 text--sm">0h</span>
           </div>
            <div class="project__overview--item">
               <span class="text--color-dark text--medium">Team Members:</span>
                <span class="ml--10 text--sm">1</span>
           </div>
    </div>
 </div>
</template>

<script>
import IconSvg from '../../icons/Icon-Svg.vue';

export default {
    name: 'ProjectOverview',
    created() {
    },
    components: {
        IconSvg
    },
    props: {
        user: Object
    },
    data: () => ({
        isEditableTitle: false,
        isEditableStatus: false,
        title: '',
        status: ''
    }),
    computed: {

    },
    methods: {
        toggleTitleEdit(value) {
            this.isEditableTitle = value;
        },
        toggleStatusEdit(value) {
            this.isEditableStatus = value;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .form {
        max-width: 600px;
        padding: 30px;
        height: auto;
    }
    .password__change {
        border-top: 2px solid #eee;
        margin-top: 1.5rem;
        padding-top: 2rem;
    }
    input[disabled] {
        background-color: #fafbfc;
        cursor: not-allowed;
    }
    textarea {
        min-height: 70px;
    }
    label {
        font-size: 0.8rem;
    }
</style>
