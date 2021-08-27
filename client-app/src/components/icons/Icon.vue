<template :style="styles" :width="width" :height="height" :fill="fill">
</template>

<script>
export default {
  name: 'IconMain',
  props: {},

  data() {
    return {
    }
  },

  computed: {
    _iconPosition() {
      switch( this.iconPosition ) {
        case "right": return "right"
        default: return "left";
      }
    }
  },

  components: {
    // IconSvg,
  },

  methods: {
  }
}
</script>

<style>
</style>
