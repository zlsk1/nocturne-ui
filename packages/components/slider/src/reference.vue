<template>
  <div
    ref="referenceRef"
    :class="[
      'n-slider__reference-wrapper',
      { 'is-disabled': disabled,
        'is-active': isActive,
      }
    ]"
    :style="positionStyle"
    @mousedown.stop="onMousedown"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <NTooltip
      ref="tooltipRef"
      :disabled="!showTooltip"
      :placement="placement"
      :popper-class="tooltipClass"
      :visible="visible"
    >
      <div class="n-slider__reference"></div>
      <template #content>
        <span>{{ formatValue }}</span>
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed, watch, nextTick } from 'vue'
import { SLIDER_INJECT_KEY } from './constants'
import { sliderReferenceProps, sliderReferenceEmits } from './reference'
import { NTooltip } from '@/components'
import type { TooltipInstance } from '@/components/tooltip'

defineOptions({
  name: 'NSliderReference'
})

const props = defineProps(sliderReferenceProps)
const emit = defineEmits(sliderReferenceEmits)

const { sliderRef, positionPercent } = inject(SLIDER_INJECT_KEY, undefined)!

type PositionData = {
  top: number,
  left: number
}

const referenceRef = ref<HTMLDivElement>()
const tooltipRef = ref<TooltipInstance>()
const positionData = ref<PositionData>({ top: 0, left: 0 })
const isActive = ref(false)
const visible = ref(false)

let parentLeft = 0
let parentTop = 0
let parentWidth = 0
const parentHeight = (props.height!)
const diff = props.max - props.min
const diffs: number[] = []

watch(sliderRef, () => {
  const rect = sliderRef.value!.getBoundingClientRect()
  parentLeft = rect?.x
  parentTop = rect?.y
  parentWidth = rect?.width

  if (props.step) {
    for (let i = 0; i <= props.step; i++) {
      if (!props.vertical) {
        diffs.push((parentWidth / props.step) * i)
      }
      else {
        diffs.push((parentHeight / props.step) * i)
      }
    }
  }
})

const positionStyle = computed(() => {
  if (!props.vertical) {
    return {
      left: positionPercent.value + '%'
    }
  }
  else {
    return {
      bottom: positionPercent.value + '%'
    }
  }
})

const formatValue = computed<number>(() => {
  if (!props.formatValueFn) {
    return Math.round(positionPercent.value)
  }
  else {
    return useFormat()
  }
})

const onMousedown = (e: MouseEvent) => {
  e.preventDefault()
  if (props.disabled) return

  if (props.showTooltip && !visible.value) visible.value = true

  isActive.value = true

  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', handleMoveEnd)
}

const handleMove = (e: MouseEvent) => {
  e.preventDefault()

  const left = e.clientX - parentLeft
  const top = e.clientY - parentTop

  if (!props.vertical) {
    setPositionData('left', left, parentWidth)
    setPercent(positionData.value.left)
  }
  else {
    setPositionData('top', top, parentHeight)
    setPercent(positionData.value.top)
  }

  tooltipRef.value?.updatePopper()
  nextTick(() => emit('change', formatValue.value))
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

const setPercent = (val: number) => {
  positionPercent.value = props.vertical ? 100 - (val / parentHeight * 100) : (val / parentWidth * 100)
}

const useFormat = () => {
  const calculateVal = props.min + Math.round(positionPercent.value * (diff) / 100)
  return props.formatValueFn!(calculateVal)
}

const setPositionData = (direction: 'left' | 'top', directionVal: number, parent: number) => {
  if (directionVal < 0) {
    positionData.value[direction] = 0
  }
  else if (directionVal >= parent) {
    positionData.value[direction] = parent
  }
  else {
    if (props.step) {
      for (let i = 0; i < diffs.length; i++) {
        if (directionVal > diffs[i] && directionVal < diffs[i + 1]) {
          if (directionVal - diffs[i] < parent / props.step / 2) {
            positionData.value[direction] = diffs[i]
          }
          else {
            positionData.value[direction] = diffs[i + 1]
          }
        }
      }
    }
    else {
      positionData.value[direction] = directionVal
    }
  }
}

defineExpose({
  handleMove
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/slider.scss';
</style>
