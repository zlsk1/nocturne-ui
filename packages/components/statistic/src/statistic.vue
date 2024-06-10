<script lang="ts" setup>
import { computed } from 'vue'
import { statisticProps } from './statistic'
import { FrIcon } from '@/components'
import { isFunction, isNumber } from '@/utils'

defineOptions({
  name: 'FrStatistic'
})

const props = defineProps(statisticProps)

const _value = computed(() => {
  const { formatter, precision, value } = props
  let newValue
  if (isFunction(formatter)) return formatter(value)
  if (!isNumber(value)) return value
  if (precision) newValue = value.toFixed(precision).toLocaleString()
  else newValue = value.toLocaleString('en-US')
  return newValue
})

defineExpose({
  _value
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
