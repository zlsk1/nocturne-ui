<template>
  <div class="n-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

defineOptions({
  name: 'NButtonGroup'
})
</script>

<style lang="scss">
@use '@/theme-chalk/src/button-group.scss';
</style>
