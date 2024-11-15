import select from './select.vue'
import type { ExtractPropTypes } from 'vue'
import type { Options } from '@popperjs/core'
import {
  definePropType,
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString
} from '@/utils'
import { componentSizes } from '@/constants'

export const selectProps = {
  placeholder: {
    type: String,
    default: '请选择'
  },
  modelValue: {
    type: definePropType<
      | string
      | number
      | boolean
      | Array<string | number | boolean | object>
      | object
    >([String, Number, Boolean, Object]),
    validator: (val: string | number | boolean | [] | object, props: any) => {
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
   * @description 当option的value为对象时 做为判定对象相等的键名
   */
  valueKey: {
    type: String,
    validator(value: string, props: any) {
      return (
        Object.keys(props.modelValue).includes(value) ||
        (props.modelValue.length > 0
          ? isArray(props.modelValue) &&
            props.modelValue.some((v: any) => Object.keys(v).includes(value))
          : true)
      )
    }
  },
  persistent: {
    type: Boolean,
    default: true
  },
  popperClass: {
    type: String,
    default: ''
  },
  popperOption: {
    type: definePropType<Partial<Options>>(Object),
    default: () => {
      return {}
    }
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
  height: {
    type: [String, Number],
    default: '200'
  }
}

export const selectEmits = {
  'update:modelValue': (val: string | number | boolean | object | Array<any>) =>
    isString(val) ||
    isNumber(val) ||
    isBoolean(val) ||
    isObject(val) ||
    isArray(val)
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectEmits = typeof selectEmits
export type SelectInstance = InstanceType<typeof select>
