import { ExtractPropTypes } from 'vue'
import inputNumber from './input-number.vue'
import { componentSizes } from '@/constants'
import { isNumber } from '@/utils'

export const inputNumberProps = {
  modelValue: {
    type: Number,
    default: true
  },
  size: {
    type: String,
    value: componentSizes
  },
  placeholder: String,
  max: {
    type: Number,
    default: Infinity
  },
  min: {
    type: Number,
    default: -Infinity
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  precision: Number,
  controls: {
    type: Boolean,
    default: true
  }
} as const

export const inputNumberEmits = {
  'update:modelValue': (val: number) => isNumber(val),
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  change: (val: number) => isNumber(val)
}

export type InputNumberEmits = typeof inputNumberEmits
export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
export type InputNumberInstance = InstanceType<typeof inputNumber>
