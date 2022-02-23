<template>
    <div class="modal fade" id="editTag" tabindex="-1" aria-labelledby="editTagLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editTagLabel">Edit tag </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form @submit.prevent="" class="form--workspace__create mb--20">
                <div class="form__item">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="computedTagName" id="name">
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer flex items-center">
                <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="reset">Cancel</button>
                <button type="button" class="btn btn--primary btn--sm">Save</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditTag',
    props: {
        currentTagDetails: { type: Object, required: true, default: () => ({ _id: undefined, name: undefined, project_id: undefined }) },
    },   
    created() {
    },

    data () {
       return {
           tagName: this.currentTagDetails.name || ''
       }
    },
    computed: {
        computedTagName: {
            get() { return this.currentTagDetails.name },
            set (value) {
                // some logic
                this.$emit('update:currentTagDetails.name', value)
            }
        },
    },
    methods: {
        reset() {
            this.$emit("resetCurrentTagDetails");
        }
    },
    watch: {
    // whenever question changes, this function will run
        // tagName(newName, oldName) {
        //     if (typeof newName !== 'undefined') {
        //         this.tagName = 
        //     }
        // }
  },
}
</script>