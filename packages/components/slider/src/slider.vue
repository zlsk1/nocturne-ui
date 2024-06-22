<template>
  <div
    ref="sliderRef"
    :class="[
      'fr-slider',
      { 'is-disabled': disabled }
    ]"
  >
    <div class="fr-slider__track" @mousedown="onSliderDown">
      <div class="fr-slider__track__bar" :style="{ width: positionPercent }"></div>
      <reference
        ref="referenceRef"
        :show-tooltip="showTooltip"
        :format-value-fn="formatValueFn"
        :placement="placement"
        :tooltip-class="tooltipClass"
        :disabled="disabled"
        :max="max"
        :min="min"
        @change="changeVal"
      ></reference>
      <div class="fr-slider__step"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { SLIDER_INJECT_KEY } from './constants'
import { sliderProps, sliderEmits } from './slider'
import reference from './reference.vue'
import type { SliderReferenceInstance } from './reference'
import type { ComputedRef } from 'vue'

defineOptions({
  name: 'FrSlider'
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const sliderRef = ref<HTMLDivElement>()
const referenceRef = ref<SliderReferenceInstance>()
const positionPercent = ref<string>(props.modelValue + '%')

const onSliderDown = (e: MouseEvent) => {
  if (props.disabled) return
  referenceRef.value?.handleMove(e)
}

const changeVal = (val: ComputedRef<number>) => {
  emit('change', val.value)
}

provide(SLIDER_INJECT_KEY, {
  sliderRef,
  positionPercent
})
</script>

<style scoped>
@import '@/theme-chalk/slider.scss';
</style>
