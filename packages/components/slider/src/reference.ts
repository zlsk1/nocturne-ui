import { isNumber } from '@/utils'
import SliderReference from './reference.vue'
import type { ExtractPropTypes } from 'vue'

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
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 0
  },
  vertical: {
    type: Boolean,
    default: false
  },
  height: Number
} as const

export const sliderReferenceEmits = {
  change: (val: number) => isNumber(val)
}

export type SliderReferenceInstance = InstanceType<typeof SliderReference>
export type SliderReferenceProps = ExtractPropTypes<typeof sliderReferenceProps>
export type SliderReferenceEmits = typeof sliderReferenceEmits
