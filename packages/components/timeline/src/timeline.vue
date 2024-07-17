<script lang="ts" setup>
defineOptions({
  name: 'NTimeline'
})
</script>

<template>
  <ul class="n-timeline">
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/timeline.scss';
</style>
