<template>
    <div style="height: 100%">
    </div>
</template>

<script>

export default {
    name: 'WorkspaceLayout',
    created() {
        console.log(this.user);
        if(this.user && this.user.isRecentlyCreated === true) {
            this.setShowOnboardingModal('show');
        }
    },
    props: {
        user: Object
    },
    data: () => ({
        
    }),
    components: {
    },
    methods: {
    }
}
</script>