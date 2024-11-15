<script lang="ts" setup>
import { computed } from 'vue'
import { statisticProps } from './statistic'
import { isFunction, isNumber } from '@/utils'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NStatistic'
})

const props = defineProps(statisticProps)

const ns = useNamespace('statistic')

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
  <div :class="ns.b()">
    <div :class="ns.e('title')">
      <slot />
    </div>
    <div :class="ns.e('value')" :style="valueStyle">
      <component :is="suffixIcon" v-if="suffixIcon" />
      {{ _value }}
      <component :is="prefixIcon" v-if="prefixIcon" />
    </div>
  </div>
</template>
