<script lang="ts" setup>
import { computed } from 'vue'
import { isFunction, isNumber } from '@nocturne-ui/utils'
import { useNamespace } from '@nocturne-ui/composables'
import { statisticProps } from './statistic'

defineOptions({
  name: 'NStatistic'
})

const props = defineProps(statisticProps)

const ns = useNamespace('statistic')

const displayedValue = computed(() => {
  const { formatter, precision, value, groupSeparator } = props

  if (isFunction(formatter)) return formatter(value)
  if (!isNumber(value) || Number.isNaN(value)) return value

  let [integer, decimal = ''] = String(value).split('.')

  decimal = decimal
    .padEnd(precision, '0')
    .slice(0, precision > 0 ? precision : 0)
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)
  return [integer, decimal].join(decimal ? '.' : '')
})

defineExpose({
  displayedValue
})
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('title')">
      <slot>{{ title }}</slot>
    </div>
    <div :class="ns.e('value')" :style="valueStyle">
      <component :is="suffixIcon" v-if="suffixIcon" />
      {{ displayedValue }}
      <component :is="prefixIcon" v-if="prefixIcon" />
    </div>
  </div>
</template>
