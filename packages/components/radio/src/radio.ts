import { componentSizes } from '@/constants'
import radio from './radio.vue'
import {
  definePropType,
  isString,
  isBoolean,
  isNumber
} from '@/utils'
import type { ExtractPropTypes } from 'vue'

export const radioProps = {
  modelValue: {
    type: definePropType<string | number | boolean>([String, Number, Boolean]),
    default: undefined
  },
  value: {
    type: [Number, String, Boolean],
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
    type: [Number, String, Boolean],
    default: undefined
  }
}

export const radioEmits = {
  'update:modelValue': (val: string | number | boolean) => isString(val) || isBoolean(val) || isNumber(val),
  change: (val: string | number | boolean) => isString(val) || isBoolean(val) || isNumber(val)
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits
export type RadioInstance = InstanceType<typeof radio>
