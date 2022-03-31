<template>
    <button 
        class="btn btn--primary" 
        type="button" 
        :class="classValues" 
        :disabled="isBtnDisabled" 
        :style="{ width: btnSize }" 
        @click="handleSubmit"
    >
            <span class="spinner-border spinner-border-sm" role="status" style="vertical-align: middle;" aria-hidden="true" v-if="loadingState === 'loading'"></span>
            <slot></slot>
    </button>
</template>

<script>
import IconSvg from '../icons/Icon-Svg.vue';

export default {
    name: 'PrimaryButton',
    components: {
        IconSvg
    },
    props: {
        loadingState: { type: String, default: 'default' },
        isBtnDisabled: { type: Boolean, default: false },
        btnSize: { type: String, default: '100%' },
        classValues: { type: String, default: '' },
    },
    methods: {
      handleSubmit() {
        this.$emit("submitFunc");
      }
    }
}
</script>