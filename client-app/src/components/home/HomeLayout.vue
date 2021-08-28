<template>
    <div style="height: 100%">
        <!-- <button class="btn btn--sm btn--default" @click="setShowOnboardingModal('show')">Modify Chargeback</button> -->
        <!-- sidebar here -->
        <dashboard-layout></dashboard-layout>
        <!-- Dashboard contents here -->

        <!-- Add onboarding modal -->
         <onboarding-modal 
            :user="{
                id: 1,
                isVerified: true
            }"
            :showOnboardingModal="showOnboardingModal"
        >
        </onboarding-modal>
        
    </div>
</template>

<script>
import OnboardingModal from '../shared/modals/Onboarding.vue';
import Dashboard from '../shared/navigation/Dashboard.vue';


export default {
    name: 'HomeLayout',
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
        showOnboardingModal: false,
    }),
    components: {
        'onboarding-modal': OnboardingModal,
        'dashboard-layout': Dashboard
    },
    methods: {
        setShowOnboardingModal(value) {
            if(value === 'show') {
                this.showOnboardingModal = true 
            } else if(value === 'hide') {
                this.showOnboardingModal = false 
            } else {
                this.showOnboardingModal = false 
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
