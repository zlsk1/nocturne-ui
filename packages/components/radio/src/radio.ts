import radio from './radio.vue'
import type { ExtractPropTypes } from 'vue'
import { componentSizes } from '@/constants'
import { definePropType, isBoolean, isNumber, isString } from '@/utils'

export const radioProps = {
  modelValue: {
    type: definePropType<string | number | boolean>([String, Number, Boolean]),
    default: undefined
  },
  value: {
    type: definePropType<number | string | boolean>([Number, String, Boolean]),
    default: undefined
  },
  size: {
    type: String,
    values: componentSizes
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: definePropType<number | string | boolean>([Number, String, Boolean]),
    default: undefined
  }
} as const

export const radioEmits = {
  'update:modelValue': (val: string | number | boolean) =>
    isString(val) || isBoolean(val) || isNumber(val),
  change: (val: string | number | boolean) =>
    isString(val) || isBoolean(val) || isNumber(val)
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits
export type RadioInstance = InstanceType<typeof radio>
