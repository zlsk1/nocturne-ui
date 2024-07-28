<template>
  <div class="n-card">
    <div class="n-card--header">{{ header }}</div>
    <div :class="['n-card--content', ContentClass]">
      <slot name="default"></slot>
    </div>
    <div class="n-card--footer">{{ footer }}</div>
  </div>
</template>

<script lang="ts" setup>
import { cardProps } from './card'

defineOptions({
  name: 'NCard'
})

defineProps(cardProps)
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/card.scss';
</style>
