<template>
    <div class="modal fade" id="createOrEditClient" tabindex="-1" aria-labelledby="createOrEditClientLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createOrEditClientLabel">{{ isEdit ? 'Edit Client' : 'Add client' }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form @submit.prevent="" class="form--workspace__create mb--20">
                <div class="form__item">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="clientName" id="name" placeholder="Client X">
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn--secondary mr--10 btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="clearEditClient">Cancel</button>
                <button type="button" class="btn btn--primary btn--sm">{{isEdit ? 'Update client' : 'Create client'}}</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CreateClient',
    props: ['isEdit', 'editValue', 'clearEditClient'],
    data: () => ({
    }),
    computed: {
        clientName() {
            return this.isEdit ? this.editValue : ''
        }
    },
    methods: {
    }
}
</script>