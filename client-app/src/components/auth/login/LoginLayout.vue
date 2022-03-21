<template>
    <div style="height: 100%;">
        <!-- <single-option-layout /> -->
        <multi-option-layout />
    </div>
</template>

<script>
import SingleOptionLayout from './SingleOption.vue'
import MultiOptionLayout from './MultiOption.vue'

export default {
  name: 'LoginLayout',
  components: {
    SingleOptionLayout,
    MultiOptionLayout
  },
  data: () => ({
  }),
  computed: {},
  methods: {}
}
</script>