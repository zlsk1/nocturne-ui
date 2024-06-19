<template>
  <div class="fr-scrollbar__bar" :style="{ top: scrollTop + 'px' }">
    <div class="fr-scrollbar__thumb"></div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { SCROLLBAR_INJECTION_KEY } from './constants'

const { position } = inject(SCROLLBAR_INJECTION_KEY, undefined)!

const scrollTop = computed(() => {
  return position.value.top - 6 < 0 ? 0 : position.value.top - 6
})
</script>

<style scoped>
@import '@/theme-chalk/scrollbar.scss';
</style>
