<template>
  <div ref="sliderRef" :class="sliderCls">
    <div :class="ns.e('track')" @mousedown="onSliderDown">
      <div :class="ns.e('track__bar')" :style="barStyle" />
      <slider-trigger
        ref="triggerRef"
        :min="min"
        :max="max"
        :show-tooltip="showTooltip"
        :format-value-fn="formatValueFn"
        :placement="placement"
        :disabled="disabled"
        :tooltip-class="tooltipClass"
        :step="step"
        :vertical="vertical"
        :marks="marks"
        @change="changeVal"
      />
      <div v-if="step" :class="ns.e('step')">
        <div
          v-for="(_, index) in step + 1"
          :key="index"
          :class="ns.e('step__item')"
        />
      </div>
      <div v-if="marks" :class="ns.e('step')">
        <div v-for="[key, mark] in Object.entries(marks)" :key="key">
          <div
            :class="ns.e('step__mark')"
            :style="{
              position: 'absolute',
              ...getMarkPosition(key)
            }"
          />
          <template v-if="!isString(mark)">
            <div
              :class="ns.e('step__mark__text')"
              :style="{
                position: 'absolute',
                ...getMarkPosition(key),
                ...mark.style
              }"
            >
              {{ mark.label }}
            </div>
          </template>
          <template v-else
            ><div
              :class="ns.e('step__mark__text')"
              :style="{
                position: 'absolute',
                ...getMarkPosition(key)
              }"
            >
              {{ mark }}
            </div></template
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { isString } from '@/utils'
import { useNamespace } from '@/composables'
import { useFormItem } from '@/components/form'
import { SLIDER_INJECT_KEY } from './constants'
import { sliderEmits, sliderProps } from './slider'
import SliderTrigger from './trigger.vue'
import type { SliderTriggerInstance } from './trigger'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NSlider'
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const ns = useNamespace('slider')
const { formItemDisabled, formItemSize } = useFormItem()

const sliderRef = ref<HTMLDivElement>()
const triggerRef = ref<SliderTriggerInstance>()
const percent = ref<number>(props.modelValue)

const barStyle = computed<CSSProperties>(() => {
  if (!props.vertical) {
    return {
      width: `${percent.value}%`
    }
  } else {
    return {
      height: `${percent.value}%`
    }
  }
})

const sliderCls = computed(() => [
  ns.b(),
  ns.is('disabled', disabled.value),
  ns.is('vertical', props.vertical),
  ns.e(formItemSize || props.size)
])

const disabled = computed(() => formItemDisabled || props.disabled)

const onSliderDown = (e: MouseEvent) => {
  if (disabled.value) return
  triggerRef.value?.handleMove(e)
}

const changeVal = (formatValue: number, triggerPercent: number) => {
  if (!props.range) {
    percent.value = triggerPercent
  }
  emit('change', formatValue)
}

const getMarkPosition = (key: number | string) => {
  if (props.vertical) {
    return {
      top: `${key}%`
    }
  } else {
    return {
      left: `${key}%`
    }
  }
}

provide(SLIDER_INJECT_KEY, { sliderRef, percent })
</script>
