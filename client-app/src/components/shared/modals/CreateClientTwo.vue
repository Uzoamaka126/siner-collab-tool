<template>
    <div class="modal fade" id="createClient" tabindex="-1" aria-labelledby="createClientLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createClientLabel">Add client </h5>
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
                <button type="button" class="btn btn--primary btn--sm">Create client</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CreateClient',
    props: [],
    data: () => ({
       clientName: ''
    }),
    computed: {
    },
    methods: {
    }
}
</script>