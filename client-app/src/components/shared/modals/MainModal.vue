<template v-if="showModal && name !== ''">
    <div 
        class="modal fade" 
        :class="{ show: showModal }" 
    >
        <!-- Modal Dialog -->
        <div class="modal__dialog modal__dialog--sm" :class="{ 'modal__dialog--show': showModal }"  role="document">
            <div class="modal__header">
                <slot name=""></slot>
            </div>
            <!-- Modal content -->
            <div class="modal__content">
                <!-- Modal Body -->
                <div class="modal__body modal__body--pad">
                   <slot></slot>
                </div>
            </div>
        </div>
    </div>        
</template>


<script>
export default {
    name: 'MainModal',
    props: ["showModal", "name"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
