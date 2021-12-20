<template>
    <div>

    </div>
</template>

<script>

export default {
    name: 'InputMultipleEmails',
    
    components: {},

    created() {},
    
    data() {
        return { 
        }
    },

    computed: {
       
    },

    methods: {
        preventKeys (event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 37 || event.keyCode == 39) {
            } else {
                return event.preventDefault();
            }
        },
    },
    watch: {}
}
</script>

<style lang="scss" scoped>

</style>