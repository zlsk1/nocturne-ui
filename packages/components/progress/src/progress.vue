<template>
  <div
    :class="[ns.b(), ns.is('circle', props.type === 'circle')]"
    :style="{ height: height + 'px' }"
  >
    <div v-if="type === 'line'" :class="ns.m('line')">
      <div :class="ns.e('bg')" v-bind="{ ...$attrs }" />
      <div v-if="text" :class="ns.em('inner', 'text')">
        {{ props.percentage + '%' }}
      </div>
      <div ref="barRef" :class="ns.e('bar')" :style="barStyle">
        <span v-if="$slots.inner" :class="ns.e('bar__inner')">
          <slot name="inner" />
        </span>
      </div>
    </div>
    <div v-else-if="type === 'circle'" :class="ns.m('circle')">
      <div v-if="text" :class="ns.e('slot')">{{ props.percentage + '%' }}</div>
      <div v-if="$slots.default && type === 'circle'" :class="ns.e('slot')">
        <slot />
      </div>
      <svg
        :viewBox="`0 0 ${circleSize} ${circleSize}`"
        :width="circleSize"
        :height="circleSize"
      >
        <circle
          :class="ns.m('circle__bg')"
          :cx="circleSize / 2"
          :cy="circleSize / 2"
          :r="radius"
          fill="transparent"
          :stroke-dasharray="strokeDashArray"
          :stroke-dashoffset="0"
          :stroke-width="strokeWidth"
          :stroke-linecap="strokeLineCap"
        />
        <circle
          ref="circleRef"
          :class="ns.m('circle--fill')"
          :cx="circleSize / 2"
          :cy="circleSize / 2"
          :r="radius"
          fill="transparent"
          :stroke="color"
          :stroke-dasharray="strokeDashArray"
          :stroke-dashoffset="strokeDashOffset"
          :stroke-width="strokeWidth"
          :stroke-linecap="strokeLineCap"
        />
      </svg>
    </div>
    <div v-if="$slots.default && type === 'line'" :class="ns.e('slot')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { progressProps } from './progress'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NProgress'
})

const props = defineProps(progressProps)

const ns = useNamespace('progress')

const GAP = 10

const barRef = ref<HTMLElement>()
const circleRef = ref<HTMLElement>()

const barStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.percentage}%`,
    backgroundColor: props.color
  }
})

const circleSize = computed(() => 2 * props.radius + props.strokeWidth + GAP)

const circumference = computed(() => props.radius * 2 * Math.PI)

const strokeDashArray = computed(() => {
  return Math.round(circumference.value * 1000) / 1000
})

const strokeDashOffset = computed(() => {
  return circumference.value - (props.percentage / 100) * circumference.value
})

watchEffect(() => {
  if (props.animation) {
    barRef.value?.style.setProperty('--width', `${props.percentage}%`)
  }
  if (props.loop) {
    barRef.value?.style.setProperty('--loop', 'infinite')
  }
  if (props.type === 'circle') {
    circleRef.value?.style.setProperty(
      '--dasharray',
      String(strokeDashArray.value)
    )
    circleRef.value?.style.setProperty(
      '--dashoffset',
      String(strokeDashOffset.value)
    )
  }
})

defineExpose({
  ref: barRef
})
</script>
