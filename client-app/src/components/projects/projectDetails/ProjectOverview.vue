<template>
    <div style="height: 100%">
        <div>
            <!-- title -->
           <div class="project__overview--item">
               <span class="text--color-dark text--medium">Title:</span>
                <span v-if="!isEditableTitle">
                    <span class="ml--10 text--sm">Test Title</span>
                    <span class="ml--10 text--xs text--link text-faded cursor-pointer" @click="toggleTitleEdit(true)">(Edit)</span>
                </span>
                <span v-else class="ml--10">
                    <span class="bd-search position-relative cursor-pointer" style="margin-right: 0.825rem;" @click="toggleTitleEdit(false)">
                        <span role="listbox" id="algolia-autocomplete-listbox-0" style="position: absolute; top: -6px; z-index: 100; right: 5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(45, 166, 8, 0.5);transform: ;msFilter:;">
                                <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                            </svg>
                        </span>
                        <input 
                            type="text" 
                            class="form__input form__input--lg" 
                            v-model="title"
                            style="position: relative; vertical-align: top; font-size: 14px; padding-left: 10px;"
                        >
                    </span>
                </span>
           </div>
           <div class="project__overview--item">
               <span class="text--color-dark text--medium">Status:</span>
                <span class="ml--10 text--sm">Pending</span>
                <span class="ml--10 text--xs text--link text-faded cursor-pointer">(Edit)</span>
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
        title: ''
    }),
    computed: {

    },
    methods: {
        toggleTitleEdit(value) {
            this.isEditableTitle = value;
        }
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
