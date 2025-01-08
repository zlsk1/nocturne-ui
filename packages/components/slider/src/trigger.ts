import { definePropType, isNumber } from '@/utils'
import SliderTrigger from './trigger.vue'
import type { CSSProperties, ExtractPropTypes } from 'vue'

type SliderMark = Record<
  string | number,
  string | { label: any; style: CSSProperties }
>

export const sliderTriggerProps = {
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
  marks: {
    type: definePropType<SliderMark>(Object)
  }
} as const

export const sliderTriggerEmits = {
  change: (formatValue: number, triggerPercent: number) =>
    isNumber(formatValue) && isNumber(triggerPercent)
}

export type SliderTriggerInstance = InstanceType<typeof SliderTrigger>
export type SliderTriggerProps = ExtractPropTypes<typeof sliderTriggerProps>
export type SliderTriggerEmits = typeof sliderTriggerEmits
