<script setup>
defineOptions({
  name: 'FrTimeline'
})
</script>

<template>
  <ul class="fr-timeline">
    <slot></slot>
  </ul>
</template>

<style>
@import '@/theme-chalk/timeline.scss';
</style>
