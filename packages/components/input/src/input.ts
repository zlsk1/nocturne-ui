import { definePropType } from '@/utils'
import { ExtractPropTypes } from 'vue'
import Input from './input.vue'
import { isString, isNumber } from '@/utils'
import { componentSizes } from '@/constants'
import { iconPropType } from '@/utils'

export const inputProps = {
  type: {
    type: String,
    default: 'text'
  },
  size: {
    type: String,
    value: componentSizes,
    default: ''
  },
  modelValue: {
    type: definePropType<string | number>([String, Number])
  },
  placeholder: String,
  disabled: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  tabindex: {
    type: definePropType<string | number>([String, Number])
  },
  maxlength: {
    type: definePropType<string | number>([String, Number])
  },
  minlength: {
    type: definePropType<string | number>([String, Number])
  },
  max: {
    type: definePropType<string | number>([String, Number])
  },
  min: {
    type: definePropType<string | number>([String, Number])
  },
  suffixIcon: iconPropType,
  prefixIcon: iconPropType,
  showLimit: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  // 只有type为textarea
  rows: Number,
  noResize: {
    type: Boolean,
    deafult: false
  }
} as const

export const inputEmits = {
  'update:modelValue': (val: string | number) => isString(val) || isNumber(val),
  input: (val: string | number) => isString(val) || isNumber(val),
  change: (val: string | number) => isString(val) || isNumber(val),
  clearValue: () => true,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent
}

export type InputInstance = InstanceType<typeof Input>
export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmits = typeof inputEmits
