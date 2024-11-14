<template>
  <div
    ref="sliderRef"
    :class="sliderCls"
    :style="{
      height: vertical ? height + 'px' : ''
    }"
  >
    <div :class="ns.e('track')" @mousedown="onSliderDown">
      <div :class="ns.e('track__bar')" :style="barStyle"></div>
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
      <div v-if="step" :class="ns.e('step')">
        <div
          v-for="(_, index) in step + 1"
          :key="index"
          :class="ns.e('step__item')"
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
import { useNamespace } from '@/composables'
import type { SliderReferenceInstance } from './reference'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NSlider'
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const ns = useNamespace('slider')

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

const sliderCls = computed(() => [
  ns.b(),
  ns.is('disabled', props.disabled),
  ns.is('vertical', props.vertical)
])

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
