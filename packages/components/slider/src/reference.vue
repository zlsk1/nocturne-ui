<template>
  <div
    ref="referenceRef"
    :class="[
      ns.em('reference', 'wrapper'),
      ns.is('disabled', disabled),
      ns.is('active', isActive),
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
      <div :class="ns.e('reference')"></div>
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
import { useNamespace } from '@/composables'
import type { TooltipInstance } from '@/components/tooltip'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NSliderReference'
})

const props = defineProps(sliderReferenceProps)
const emit = defineEmits(sliderReferenceEmits)

const ns = useNamespace('reference')

const { sliderRef, positionPercent } = inject(SLIDER_INJECT_KEY, undefined)!

const referenceRef = ref<HTMLDivElement>()
const tooltipRef = ref<TooltipInstance>()
const positionData = ref(0)
const isActive = ref(false)
const visible = ref(false)

let parentWidth = 0
let distance = 0
let rect: DOMRect
const parentHeight = (props.height!)
const diff = props.max - props.min
const diffs: number[] = []

watch(sliderRef, () => {
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

const positionStyle = computed<CSSProperties>(() => {
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
    return handleFormat()
  }
})

const onMousedown = (e: MouseEvent) => {
  e.preventDefault()

  if (props.disabled) return
  if (props.showTooltip && !visible.value) visible.value = true

  isActive.value = true

  rect = sliderRef.value?.getBoundingClientRect()!
  parentWidth = rect?.width

  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', handleMoveEnd)
}

const handleMove = (e: MouseEvent) => {
  e.preventDefault()

  distance = getClientDistance(e, rect)

  if (!props.vertical) {
    setPositionData(distance, parentWidth)
    setPercent(positionData.value)
  }
  else {
    setPositionData(distance, parentHeight)
    setPercent(positionData.value)
  }

  tooltipRef.value?.updatePopper()
  nextTick(() => emit('change', formatValue.value))
}

const getClientDistance = (e: MouseEvent, rect: DOMRect) => {
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

const setPercent = (val: number) => {
  positionPercent.value = props.vertical ? 100 - (val / parentHeight * 100) : (val / parentWidth * 100)
}

const handleFormat = () => {
  const calculateVal = props.min + Math.round(positionPercent.value * (diff) / 100)
  return props.formatValueFn!(calculateVal)
}

const setPositionData = (distance: number, parent: number) => {
  if (distance < 0) {
    positionData.value = 0
  }
  else if (distance >= parent) {
    positionData.value = parent
  }
  else {
    if (props.step) {
      for (let i = 0; i < diffs.length; i++) {
        if (distance > diffs[i] && distance < diffs[i + 1]) {
          if (distance - diffs[i] < parent / props.step / 2) {
            positionData.value = diffs[i]
          }
          else {
            positionData.value = diffs[i + 1]
          }
        }
      }
    }
    else {
      positionData.value = distance
    }
  }
}

defineExpose({
  handleMove
})
</script>
