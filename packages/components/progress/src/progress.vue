<template>
  <div class="fr-progress">
    <div v-if="type === 'line'" class="fr-progress--line">
      <div class="fr-progress__bg"></div>
      <div
        class="fr-progress__progress"
        :style="{ width: percentage + '%', backgroundColor: color }"
      ></div>
    </div>
    <div v-if="type === 'round'" class="fr-progress--round">
      <div class="fr-progress__bg"></div>
      <div
        class="fr-progress__progress"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
    <div class="fr-progress__slot">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { progressProps } from './index'
defineOptions({
  name: 'FrProgress'
})

defineProps(progressProps)
</script>

<style lang="scss" scoped>
@import '@/theme-chalk/progress.scss';
</style>
