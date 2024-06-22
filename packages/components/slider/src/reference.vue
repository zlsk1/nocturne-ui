<template>
  <div
    ref="referenceRef"
    :class="[
      'fr-slider__reference-wrapper',
      { 'is-disabled': disabled,
        'is-active': isActive,
      }
    ]"
    :style="positionStyle"
    @mousedown.stop="onMousedown"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <FrTooltip
      ref="tooltipRef"
      :disabled="!showTooltip"
      :placement="placement"
      :popper-class="tooltipClass"
      :visible="visible"
    >
      <div class="fr-slider__reference"></div>
      <template #content>
        <span>{{ formatValue }}</span>
      </template>
    </FrTooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed, watch, nextTick } from 'vue'
import { SLIDER_INJECT_KEY } from './constants'
import { sliderReferenceProps, sliderReferenceEmits } from './reference'
import { FrTooltip } from '@/components'
import type { TooltipInstance } from '@/components/tooltip'

defineOptions({
  name: 'FrSliderReference'
})

const props = defineProps(sliderReferenceProps)
const emit = defineEmits(sliderReferenceEmits)

const { sliderRef, positionPercent } = inject(SLIDER_INJECT_KEY, undefined)!

const referenceRef = ref<HTMLDivElement>()
const tooltipRef = ref<TooltipInstance>()
const positionData = ref({ top: 0, left: 0 })
const isActive = ref(false)
const visible = ref(false)

let calculateVal:number

let parentLeft = 0
let parentWidth = 0

watch(sliderRef, () => {
  parentLeft = sliderRef.value!.getBoundingClientRect()?.x
  parentWidth = sliderRef.value!.getBoundingClientRect()?.width
})

watch(
  positionData,
  (val) => {
    positionPercent.value = (val.left / parentWidth * 100) + '%'
  },
  {
    deep: true
  }
)

const positionStyle = computed(() => {
  return {
    left: positionPercent.value
  }
})

const formatValue = computed<number>(() => {
  if (!props.formatValueFn) {
    return Math.ceil(Number(positionPercent.value.slice(0, -1)) / 100)
  }
  else {
    if ((props.min && !props.max) || !props.formatValueFn) {
      calculateVal = Math.ceil(Number(positionPercent.value.slice(0, -1)) / 100)
    }
    else if (!props.min && props.max) {
      calculateVal = Math.ceil(Number(positionPercent.value.slice(0, -1)) * props.max / 100)
    }
    else if (props.min || props.max) {
      calculateVal = props.min! + Math.ceil(Number(positionPercent.value.slice(0, -1)) * (props.max! - props.min!) / 100)
    }
    return props.formatValueFn(calculateVal)
  }
})

const onMousedown = (e: MouseEvent) => {
  if (props.disabled) return

  if (props.showTooltip && !visible.value) visible.value = true

  isActive.value = true

  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', handleMoveEnd)
}

const handleMove = (e: MouseEvent) => {
  const left = e.clientX - parentLeft

  e.preventDefault()

  if (left < 0) {
    positionData.value.left = 0
  }
  else if (left >= parentWidth) {
    positionData.value.left = parentWidth
  }
  else {
    positionData.value.left = left
  }
  tooltipRef.value?.updatePopper()
  nextTick(() => emit('change', formatValue))
}

const handleMoveEnd = (e: MouseEvent) => {
  if (props.showTooltip) visible.value = false

  isActive.value = false

  e.preventDefault()
  window.removeEventListener('mousemove', handleMove)
  window.removeEventListener('mouseup', handleMoveEnd)
}

const onMouseenter = () => {
  visible.value = true
}

const onMouseleave = () => {
  if (!isActive.value) visible.value = false
}

defineExpose({
  handleMove
})
</script>

<style scoped>
@import '@/theme-chalk/slider.scss';
</style>
