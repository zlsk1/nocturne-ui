import { componentSizes } from '@/constants'
import { isBoolean, isNumber, isString } from '@/utils'
import { definePropType } from '@/utils'
import Check from './checkbox.vue'

import type { ExtractPropTypes } from 'vue'

export type CheckModelValueType = string | number | boolean

export const checkboxProps = {
  modelValue: {
    type: definePropType<CheckModelValueType>([String, Number, Boolean]),
    default: undefined
  },
  value: {
    type: definePropType<string | number | boolean | object>([String, Number, Boolean, Object]),
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    values: componentSizes
  },
  checked: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  label: {
    type: definePropType<string | number | boolean | object>([String, Number, Boolean, Object]),
    default: undefined
  },
  trueValue: {
    type: definePropType<string | number>([String, Number]),
    default: undefined
  },
  falseValue: {
    type: definePropType<string | number>([String, Number]),
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  tabindex: definePropType<string | number>([String, Number]),
  textColor: String
} as const

export const checkboxEmits = {
  change: (val: CheckModelValueType) => isString(val) || isNumber(val) || isBoolean(val),
  'update:modelValue': (val: CheckModelValueType) => isString(val) || isNumber(val) || isBoolean(val)
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxEmits = ExtractPropTypes<typeof checkboxEmits>
export type CheckInstance = InstanceType<typeof Check>
