<template v-if="showModal && name !== ''">
    <div 
        class="modal fade" 
        :class="{ show: showModal }" 
    >
        <div class="modal__dialog" :class="{ 'modal__dialog--show': showModal }" >
            <div 
            :class="`${modalSize}`" 
            :style="modalStyles"
            role="document"
        >
            <!-- <div class="modal__header">
                <slot name=""></slot>
                 <button type="button" class="close" style="top: 50px; margin-top: unset;" v-if="isCloseButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(232, 230, 243, 1);transform: ;msFilter:;">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                    </svg>
                </button>
            </div> -->
            <!-- Modal content -->
            <div class="modal__content">
                <!-- Modal Body -->
                <div class="modal__body modal__body--pad">
                   <slot></slot>
                </div>
            </div>
        </div>
        </div>

    </div>        
</template>


<script>
export default {
    name: 'MainModal',
    props: ["showModal", "isCloseButton", "modalSize", "width", "position"],
    data() {
        return {
            modalStyles: {
                'width': !this.width ? '' : this.width,
                'margin-left': this.position === 'center' ? 'auto' : '',
                'margin-right': this.position === 'center' ? 'auto' : '',
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
