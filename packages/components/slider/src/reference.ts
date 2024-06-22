import { isNumber } from '@/utils'
import SliderReference from './reference.vue'
import type { ExtractPropTypes, ComputedRef } from 'vue'

export const sliderReferenceProps = {
  showTooltip: {
    type: Boolean,
    default: true
  },
  formatValueFn: {
    type: Function,
    default: undefined
  },
  placement: {
    type: String,
    values: ['top', 'bottom', 'left', 'right'],
    default: 'top'
  },
  tooltipClass: String,
  disabled: {
    type: Boolean,
    default: false
  },
  min: Number,
  max: Number
} as const

export const sliderReferenceEmits = {
  change: (val: ComputedRef<number>) => isNumber(val.value)
}

export type SliderReferenceInstance = InstanceType<typeof SliderReference>
export type SliderReferenceProps = ExtractPropTypes<typeof sliderReferenceProps>
export type SliderReferenceEmits = typeof sliderReferenceEmits
