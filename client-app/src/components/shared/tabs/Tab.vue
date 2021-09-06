<template>
  <div class="tab-panel" role="tabPanel">
    <div class="tab-content"><slot></slot></div>
  </div>
</template>
<script>

export default {
    name: 'Tab',
    props: ["title", "titleSlot", "disabled"],
    data: () => ({
        isActive: true
    }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.tab-panel {
  .tab-content {
    padding: 0.5rem;
  }
}
</style>
