import { ExtractPropTypes } from 'vue'
import { componentSizes } from '@nocturne-ui/constants'
import { definePropType, isNumber, isUndefined } from '@nocturne-ui/utils'
import inputNumber from './input-number.vue'

export const inputNumberProps = {
  modelValue: {
    type: Number
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
  },
  controlsMode: {
    type: definePropType<'inner' | 'outter'>(String),
    default: 'inner'
  },
  autoFocus: {
    type: Boolean,
    default: false
  }
} as const

export const inputNumberEmits = {
  'update:modelValue': (val: number | undefined) =>
    isNumber(val) || isUndefined(val),
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  change: (val: number | undefined) => isNumber(val) || isUndefined(val),
  input: (val: number | undefined) => isNumber(val) || isUndefined(val)
}

export type InputNumberEmits = typeof inputNumberEmits
export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
export type InputNumberInstance = InstanceType<typeof inputNumber>
