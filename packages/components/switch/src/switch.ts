import {
  definePropType,
  isBoolean,
  isNumber,
  isString
} from '@nocturne-ui/utils'
import { componentSizes } from '@nocturne-ui/constants'
import Switch from './switch.vue'
import type { ExtractPropTypes } from 'vue'

export const switchProps = {
  modelValue: definePropType<boolean | string | number>([
    Boolean,
    String,
    Number
  ]),
  size: {
    type: String,
    values: componentSizes
  },
  width: definePropType<string | number>([String, Number]),
  activeText: String,
  inactiveText: String,
  inactiveValue: {
    type: definePropType<boolean | string | number>([Boolean, String, Number]),
    default: false
  },
  activeValue: {
    type: definePropType<boolean | string | number>([Boolean, String, Number]),
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  tabindex: definePropType<string | number>([String, Number]),
  inlinePrompt: {
    type: Boolean,
    default: false
  },
  beforeChange: {
    type: definePropType<(() => boolean) | (() => Promise<boolean>)>([Function])
  },
  loading: {
    type: Boolean,
    default: false
  }
} as const

export const switchEmits = {
  change: (val: boolean | string | number) =>
    isNumber(val) || isString(val) || isBoolean(val),
  'update:modelValue': (val: boolean | string | number) =>
    isNumber(val) || isString(val) || isBoolean(val)
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits
export type SwitchInstance = InstanceType<typeof Switch>
