<template>
    <div class="modal fade" id="createClient" tabindex="-1" aria-labelledby="createClientLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createClientLabel">Add client</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form @submit.prevent="" class="form--workspace__create mb--20">
                <div class="form__item">
                    <div style="">
                        <label for="name" class="form-label">Client Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="clientName" id="name" placeholder="X design agency">
                    </div>
                </div>
                 <div class="form__item">
                    <div>
                        <label for="name" class="form-label">Email address</label>
                        <input type="text" class="form-control form-control-sm" v-model="email" id="name" placeholder="xyz@gmail.com">
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn--secondary mr--10 btn--sm" data-bs-dismiss="modal" aria-label="Close" @click="resetValues()">Cancel</button>
                <button type="button" class="btn btn--primary btn--sm" :disabled="isBtnDisabled">Create</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CreateClient',
    data: () => ({
        clientName: '',
        email: ''
    }),
    computed: {
        isBtnDisabled() {
            if(!this.clientName || !this.email) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        resetValues() {
            this.clientName = '';
            this.email = ''
        }
    }
}
</script>