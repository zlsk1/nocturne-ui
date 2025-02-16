import { definePropType, isNumber } from '@nocturne-ui/utils'
import { componentSizes } from '@nocturne-ui/constants'
import slider from './slider.vue'
import { sliderTriggerProps } from './trigger'
import type { ExtractPropTypes } from 'vue'
import type { ComponentSize } from '@nocturne-ui/constants'

export const sliderProps = {
  ...sliderTriggerProps,
  modelValue: {
    type: Number,
    default: 0
  },
  size: {
    type: definePropType<ComponentSize>(String),
    values: componentSizes
  },
  range: {
    type: Boolean,
    default: false
  }
} as const

export const sliderEmits = {
  change: (val: number) => isNumber(val)
}

export type SliderInstance = InstanceType<typeof slider>
export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderEmits = typeof sliderEmits
