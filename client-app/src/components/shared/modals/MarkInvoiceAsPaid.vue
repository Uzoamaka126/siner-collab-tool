<template>
    <div class="modal fade" id="markInvoiceAsPaid" tabindex="-1" aria-labelledby="markInvoiceAsPaidLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="markInvoiceAsPaidLabel">Upadate Invoice Status</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form @submit.prevent="" class="form--workspace__create mb--20">
                    <div class="form__item">
                        <div class="mb-3">
                            <p>Are you sure you want to mark this invoice as paid?</p>
                            <p>This action cannot be undone</p>
                        </div>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn--secondary mr--10 btn--sm" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                    <button type="button" class="btn btn--danger btn--sm" @click="handleDeleteClient()">Mark as paid</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DeleteClient',
    data: () => ({
        loading: 'default',

    }),
}
</script>