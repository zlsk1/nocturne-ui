import option from './option.vue'
import type { ExtractPropTypes } from 'vue'
import {
  definePropType,
  isBoolean,
  isNumber,
  isObject,
  isString
} from '@/utils'

export const optionProps = {
  value: {
    type: definePropType<string | number | boolean | object>([
      String,
      Number,
      Boolean,
      Object
    ]),
    required: true
  },
  label: {
    type: definePropType<string | number>([String, Number]),
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export const optionEmits = {
  select: (val: string | number | boolean | object) =>
    isString(val) || isNumber(val) || isBoolean(val) || isObject(val)
}

export type OptionProps = ExtractPropTypes<typeof optionProps>
export type OptionEmits = typeof optionEmits
export type FrOption = InstanceType<typeof option>
