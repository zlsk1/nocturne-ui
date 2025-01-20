<template>
  <div
    :class="[
      ns.em('trigger', 'wrapper'),
      ns.is('disabled', props.disabled),
      ns.is('active', isActive)
    ]"
    :style="positionStyle"
    @mousedown.stop="onMousedown"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <n-tooltip
      ref="tooltipRef"
      :disabled="!props.showTooltip"
      :placement="props.placement"
      :popper-class="props.tooltipClass"
      :visible="visible"
    >
      <div :class="ns.e('trigger')" />
      <template #content>
        <span>{{ formatValue }}</span>
      </template>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, ref, watchEffect } from 'vue'
import NTooltip from '@/components/tooltip'
import { useNamespace } from '@/composables'
import { sliderTriggerEmits, sliderTriggerProps } from './trigger'
import { SLIDER_INJECT_KEY } from './constants'
import type { TooltipInstance } from '@/components/tooltip'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NSliderTrigger'
})

const props = defineProps(sliderTriggerProps)
const emit = defineEmits(sliderTriggerEmits)

const { percent, sliderRef } = inject(SLIDER_INJECT_KEY, undefined)!

const ns = useNamespace('slider')

const tooltipRef = ref<TooltipInstance>()
const position = ref(0)
const isActive = ref(false)
const visible = ref(false)
const sliderWidth = ref(0)
const sliderHeight = ref(0)

let offsetValue = 0
let rect: DOMRect
const diff = props.max - props.min
const steps: number[] = []

const positionStyle = computed<CSSProperties>(() => {
  if (!props.vertical) {
    return {
      left: `${percent.value}%`
    }
  } else {
    return {
      bottom: `${percent.value}%`
    }
  }
})

const formatValue = computed<number>(() => {
  if (!props.formatValueFn) {
    return Math.round(percent.value)
  } else {
    return handleFormat()
  }
})

const triggerPercent = computed(() => {
  return props.vertical
    ? 100 - (position.value / sliderHeight.value) * 100
    : (position.value / sliderWidth.value) * 100
})

const onMousedown = (e: MouseEvent) => {
  e.preventDefault()

  if (props.disabled) return
  if (props.showTooltip && !visible.value) visible.value = true

  isActive.value = true

  rect = sliderRef.value?.getBoundingClientRect()!

  sliderWidth.value = rect.width
  sliderHeight.value = rect.height

  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', handleMoveEnd)
}

const handleMove = (e: MouseEvent) => {
  e.preventDefault()

  offsetValue = getClientOffset(e, rect)

  if (!props.vertical) {
    setPosition(offsetValue, sliderWidth.value)
  } else {
    setPosition(offsetValue, sliderHeight.value)
  }

  tooltipRef.value?.updatePopper()
  nextTick(() => emit('change', formatValue.value, triggerPercent.value))
}

const getClientOffset = (e: MouseEvent, rect: DOMRect) => {
  return !props.vertical ? e.clientX - rect?.x : e.clientY - rect?.y
}

const handleMoveEnd = (e: MouseEvent) => {
  e.preventDefault()

  if (props.showTooltip) visible.value = false

  isActive.value = false
  window.removeEventListener('mousemove', handleMove)
  window.removeEventListener('mouseup', handleMoveEnd)
}

const onMouseenter = () => {
  visible.value = true
}

const onMouseleave = () => {
  if (!isActive.value) visible.value = false
}

const handleFormat = () => {
  const calculateVal = props.min + Math.round((percent.value * diff) / 100)
  return props.formatValueFn?.(calculateVal)
}

const setPosition = (offsetValue: number, parent: number) => {
  if (offsetValue < 0) {
    position.value = 0
  } else if (offsetValue >= parent) {
    position.value = parent
  } else {
    if (props.step) {
      for (let i = 0; i < steps.length; i++) {
        if (offsetValue > steps[i] && offsetValue < steps[i + 1]) {
          if (offsetValue - steps[i] < parent / props.step / 2) {
            position.value = steps[i]
          } else {
            position.value = steps[i + 1]
          }
        }
      }
    } else {
      position.value = offsetValue
    }
  }
}

watchEffect(() => {
  if (props.step) {
    for (let i = 0; i <= props.step; i++) {
      if (!props.vertical) {
        steps.push((sliderWidth.value / props.step) * i)
      } else {
        steps.push((sliderHeight.value / props.step) * i)
      }
    }
  }
})

defineExpose({
  handleMove
})
</script>
