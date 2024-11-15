import radioGroup from './radio-group.vue'
import type { ExtractPropTypes } from 'vue'
import { componentSizes } from '@/constants'
import { definePropType, isBoolean, isNumber, isString } from '@/utils'

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
  'update:modelValue': (val: string | number | boolean) =>
    isString(val) || isBoolean(val) || isNumber(val),
  change: (val: string | number | boolean) =>
    isString(val) || isBoolean(val) || isNumber(val)
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupEmits = typeof radioGroupEmits
export type RadioGroupInstance = InstanceType<typeof radioGroup>
