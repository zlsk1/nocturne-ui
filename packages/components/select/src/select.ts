import {
  definePropType,
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString
} from '@nocturne-ui/utils'
import { componentSizes } from '@nocturne-ui/constants'
import { popperContentProps } from '@nocturne-ui/components/popper'
import select from './select.vue'
import type { ExtractPropTypes } from 'vue'
import type { Options } from '@popperjs/core'
import type { OptionProxy } from './constants'

export type SelectValue = string | number | boolean | object | Array<any>

export type SelectFilterMethod = ({
  input,
  option
}: {
  input: string
  option: OptionProxy
}) => boolean

export const selectProps = {
  placeholder: {
    type: String
  },
  modelValue: {
    type: definePropType<SelectValue>([String, Number, Boolean, Object, Array]),
    validator: (val: SelectValue, props: any) => {
      if (props.multiple && !isArray(val)) return false
      return true
    }
  },
  size: {
    type: String,
    value: componentSizes,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearValue: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * @description 当option的value为对象时 做为判定对象是否相等的键名
   */
  valueKey: {
    type: String,
    validator(value: string, props: any) {
      return (
        Object.keys(props.modelValue).includes(value) ||
        (isArray(props.modelValue) && props.modelValue.length > 0
          ? props.modelValue.some((v: any) => Object.keys(v).includes(value))
          : true)
      )
    }
  },
  persistent: {
    type: Boolean,
    default: true
  },
  popperClass: popperContentProps.popperClass,
  popperOption: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({})
  },
  placement: {
    type: String,
    values: ['bottom', 'top', 'left', 'right'],
    default: 'bottom'
  },
  tagType: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: 'info'
  },
  /**
   * @description 下拉框的高度
   */
  height: {
    type: definePropType<string | number>([String, Number]),
    default: 288
  },
  /**
   * @description 是否可搜索
   */
  showSearch: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否筛选选项 接收一个布尔值或自定义函数
   */
  filterOption: {
    type: definePropType<SelectFilterMethod | boolean>([Function, Boolean]),
    default: true
  },
  maxTagCount: {
    type: Number
  },
  maxTagCountWithTooltip: {
    type: Boolean,
    default: false
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  /**
   * @description 加载形式的后缀图标
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示后缀
   */
  showSuffix: {
    type: Boolean,
    default: true
  }
} as const

export const selectEmits = {
  'update:modelValue': (val: SelectValue) =>
    isString(val) ||
    isNumber(val) ||
    isBoolean(val) ||
    isObject(val) ||
    isArray(val),
  select: (val: SelectValue) =>
    isString(val) ||
    isNumber(val) ||
    isBoolean(val) ||
    isObject(val) ||
    isArray(val),
  change: (val: SelectValue) =>
    isString(val) ||
    isNumber(val) ||
    isBoolean(val) ||
    isObject(val) ||
    isArray(val),
  search: (query: string) => isString(query),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectEmits = typeof selectEmits
export type SelectInstance = InstanceType<typeof select>
