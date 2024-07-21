import {
  definePropType,
  isBoolean,
  isString,
  isNumber
} from '@/utils'
import { componentSizes } from '@/constants'
import Switch from './switch.vue'
import type { ExtractPropTypes } from 'vue'

export const switchProps = {
  modelValue: definePropType<boolean | string | number>([Boolean, String, Number]),
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
  inlineText: {
    type: Boolean,
    default: true
  },
  beforeChange: {
    type: definePropType<Boolean | Promise<boolean>>([Boolean, Function])
  }
} as const

export const switchEmits = {
  change: (val: boolean | string | number) => isNumber(val) || isString(val) || isBoolean(val),
  'update:modelValue': (val: boolean | string | number) => isNumber(val) || isString(val) || isBoolean(val)
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits
export type SwitchInstance = InstanceType<typeof Switch>
