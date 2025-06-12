import {
  definePropType,
  isNumber,
  isObject,
  isString
} from '@nocturne-ui/utils'
import option from './option.vue'
import type { ExtractPropTypes } from 'vue'
import type { OptionLabel } from './types'

export const optionProps = {
  value: {
    type: definePropType<string | number | object>([String, Number, Object]),
    required: true
  },
  label: {
    type: definePropType<OptionLabel>([String, Number]),
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export const optionEmits = {
  select: (val: string | number | object) =>
    isString(val) || isNumber(val) || isObject(val)
}

export type OptionProps = ExtractPropTypes<typeof optionProps>
export type OptionEmits = typeof optionEmits
export type NOption = InstanceType<typeof option>
