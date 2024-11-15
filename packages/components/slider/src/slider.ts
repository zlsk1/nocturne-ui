import slider from './slider.vue'
import { sliderReferenceProps } from './reference'
import type { ExtractPropTypes } from 'vue'
import { isNumber } from '@/utils'

export const sliderProps = {
  ...sliderReferenceProps,
  modelValue: {
    type: Number,
    default: 0
  }
}
export const sliderEmits = {
  change: (val: number) => isNumber(val)
}

export type SliderInstance = InstanceType<typeof slider>
export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderEmits = typeof sliderEmits
