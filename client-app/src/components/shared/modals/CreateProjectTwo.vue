<template>
    <div class="modal fade" id="createProject" tabindex="-1" aria-labelledby="createProjectLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createProjectLabel">Create a new project </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form @submit.prevent="" class="form--workspace__create mb--20">
                <div class="form__item">
                    <label for="name" class="form-label">Title</label>
                    <input type="text" class="form-control form-control-sm" v-model="title" id="name" placeholder="Client X">
                </div>
                 <div class="form__item">
                    <label for="name" class="form-label">Client</label>
                    <select class="form-select" aria-label="Default select example" v-model="client">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                 <div class="form__item">
                    <label for="name" class="form-label">Tags</label>
                    <select class="form-select" aria-label="Default select example" v-model="tags">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <!-- invoice upload -->
                <div class="form__item">
                    <label for="formFileMultiple" class="form-label">Invoice<span class="text--xxs text-faded"> (Upload one or more files)</span></label>
                    <input class="form-control form-control-sm" type="file" id="formFileMultiple" multiple :value="files">
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn--secondary btn--sm" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn--primary btn--sm">Create project</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CreateProjectTwo',
    props: [],
    data: () => ({
       title: '',
       client: '',
       tags: [],
       files: []
    }),
    computed: {
    },
    methods: {
    }
}
</script>