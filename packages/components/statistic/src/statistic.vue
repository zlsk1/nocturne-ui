<script setup>
import { computed } from 'vue'
import { statisticProps } from './index'
defineOptions({
  name: 'FrStatistic'
})

const props = defineProps(statisticProps)

const _value = computed(() => {
  let newValue
  if (props.precision) newValue = props.value.toFixed(props.precision).toLocaleString('en-US')
  else newValue = props.value.toLocaleString('en-US')
  return newValue
})
</script>

<template>
  <div
    :class="[
      'fr-statistic'
    ]"
  >
    <div class="fr-statistic__title">
      <slot></slot>
    </div>
    <div class="fr-statistic__value" :style="valueStyle">
      <fr-icon v-if="suffixIcon" :icon="suffixIcon"></fr-icon>
      {{ _value }}
      <fr-icon v-if="prefixIcon" :icon="prefixIcon"></fr-icon>
    </div>
  </div>
</template>

<style>
@import '@/theme-chalk/statistic.scss';
</style>
