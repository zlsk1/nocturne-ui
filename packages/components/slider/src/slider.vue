<template>
  <div
    ref="sliderRef"
    :class="[
      'n-slider',
      { 'is-disabled': disabled,
        'is-vertical': vertical
      }
    ]"
    :style="{
      height: vertical ? height + 'px' : ''
    }"
  >
    <div class="n-slider__track" @mousedown="onSliderDown">
      <div class="n-slider__track__bar" :style="barStyle"></div>
      <reference
        ref="referenceRef"
        :show-tooltip="showTooltip"
        :format-value-fn="formatValueFn"
        :placement="placement"
        :tooltip-class="tooltipClass"
        :disabled="disabled"
        :max="max"
        :min="min"
        :step="step"
        :vertical="vertical"
        :height="height"
        @change="changeVal"
      ></reference>
      <div v-if="step" class="n-slider__step">
        <div
          v-for="(_, index) in step + 1"
          :key="index"
          class="n-slider__step__item"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, computed } from 'vue'
import { SLIDER_INJECT_KEY } from './constants'
import { sliderProps, sliderEmits } from './slider'
import reference from './reference.vue'
import type { SliderReferenceInstance } from './reference'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NSlider'
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const sliderRef = ref<HTMLDivElement>()
const referenceRef = ref<SliderReferenceInstance>()
const positionPercent = ref<number>(props.modelValue)

const barStyle = computed<CSSProperties>(() => {
  if (!props.vertical) {
    return {
      width: positionPercent.value + '%'
    }
  }
  else {
    return {
      height: positionPercent.value + '%'
    }
  }
})

const onSliderDown = (e: MouseEvent) => {
  if (props.disabled) return
  referenceRef.value?.handleMove(e)
}

const changeVal = (val: number) => {
  emit('change', val)
}

provide(SLIDER_INJECT_KEY, {
  sliderRef,
  positionPercent
})
</script>
