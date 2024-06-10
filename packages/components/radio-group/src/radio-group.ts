import { componentSizes } from '@/constants'
import radioGroup from './radio-group.vue'
import {
  definePropType,
  isString,
  isBoolean,
  isNumber
} from '@/utils'
import type { ExtractPropTypes } from 'vue'

export const radioGroupProps = {
  modelValue: {
    type: definePropType<string | number | boolean>([String, Number, Boolean]),
    default: undefined
  },
  size: {
    type: String,
    values: componentSizes
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export const radioGroupEmits = {
  'update:modelValue': (val: string | number | boolean) => isString(val) || isBoolean(val) || isNumber(val),
  change: (val: string | number | boolean) => isString(val) || isBoolean(val) || isNumber(val)
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupEmits = typeof radioGroupEmits
export type RadioGroupInstance = InstanceType<typeof radioGroup>
