import { ExtractPropTypes } from 'vue'
import { definePropType, iconPropType, isString } from '@/utils'
import { componentSizes } from '@/constants'
import Input from './input.vue'

export type InputStatus = 'warning' | 'error'

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
  /**
   * @description 是否显示切换密码图标
   */
  showPassword: {
    type: Boolean,
    default: true
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
  /**
   * @description 只有type为textarea
   */
  rows: Number,
  /**
   * @description 不能改变textarea的高度
   */
  noResize: {
    type: Boolean,
    deafult: false
  },
  afterBlur: {
    type: Function
  },
  id: String,
  autoResize: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    values: ['outlined', 'borderless', 'filled'],
    default: 'outlined'
  },
  status: {
    type: definePropType<InputStatus>(String)
  }
} as const

export const inputEmits = {
  'update:modelValue': (val: string) => isString(val),
  input: (val: string) => isString(val),
  change: (val: string) => isString(val),
  clearValue: () => true,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  compositionstart: (e: CompositionEvent) => e instanceof CompositionEvent,
  compositionupdate: (e: CompositionEvent) => e instanceof CompositionEvent,
  compositionend: (e: CompositionEvent) => e instanceof CompositionEvent
}

export type InputInstance = InstanceType<typeof Input>
export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmits = typeof inputEmits
