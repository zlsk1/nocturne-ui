<script lang="ts" setup>
import { computed } from 'vue'
import { statisticProps } from './statistic'
import { isFunction, isNumber } from '@/utils'

defineOptions({
  name: 'NStatistic'
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
      'n-statistic'
    ]"
  >
    <div class="n-statistic__title">
      <slot></slot>
    </div>
    <div class="n-statistic__value" :style="valueStyle">
      <component :is="suffixIcon" v-if="suffixIcon"></component>
      {{ _value }}
      <component :is="prefixIcon" v-if="prefixIcon"></component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/src/statistic.scss';
</style>
