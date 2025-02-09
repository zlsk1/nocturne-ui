import {
  definePropType,
  isBoolean,
  isObject,
  isString,
  isUndefined
} from '@/utils'
import { componentSizes } from '@/constants'
import form from './form.vue'
import { positionValues } from './form-item'
import type { ComponentSize } from '@/constants'

import type { ExtractPropTypes } from 'vue'

export const formProps = {
  model: Object,
  rules: Object,
  labelPosition: {
    type: String,
    values: positionValues,
    default: 'left'
  },
  labelWidth: {
    type: definePropType<string | number>([String, Number]),
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: definePropType<ComponentSize>(String),
    values: componentSizes
  },
  /**
   * @description 是否显示所有表单项的必选标记
   */
  requiredMark: {
    type: Boolean,
    default: false
  }
} as const

export const formEmit = {
  'update:model': (val: object) => isObject(val),
  validate: (prop: string, isValid: boolean, message: string) =>
    (isString(prop) || isUndefined(prop)) &&
    isBoolean(isValid) &&
    isString(message)
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmit = typeof formEmit
export type FormInstance = InstanceType<typeof form>
