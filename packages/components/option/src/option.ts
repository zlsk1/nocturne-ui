import option from './option.vue'
import {
  definePropType,
  isString,
  isNumber,
  isBoolean,
  isObject
} from '@/utils'
import type { ExtractPropTypes } from 'vue'

export const optionProps = {
  value: {
    type: definePropType<string | number | boolean | Object>([String, Number, Boolean, Object]),
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
  select: (
    val: string | number | boolean | Object
  ) => isString(val) || isNumber(val) || isBoolean(val) || isObject(val)

}

export type OptionProps = ExtractPropTypes<typeof optionProps>
export type OptionEmits = typeof optionEmits
export type FrOption = InstanceType<typeof option>
