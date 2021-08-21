<template>
    <div>
        <!-- sidebar here -->

        <!-- Dashboard contents here -->

        <!-- Add onboarding modal -->
         <onboarding-modal></onboarding-modal>
        
    </div>
</template>

<script>
import OnboardingModal from '../shared/modals/Onboarding.vue';

export default {
    name: 'OnboardingLayout',
    props: {
        msg: String
    },
    components: {
        'onboarding-modal': OnboardingModal
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
