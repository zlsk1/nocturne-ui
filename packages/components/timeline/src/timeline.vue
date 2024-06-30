<script lang="ts" setup>
defineOptions({
  name: 'FrTimeline'
})
</script>

<template>
  <ul class="fr-timeline">
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/timeline.scss';
</style>
