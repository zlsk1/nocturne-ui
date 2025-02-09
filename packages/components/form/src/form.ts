import { definePropType, isArray, isBoolean, isObject, isString } from '@/utils'
import { componentSizes } from '@/constants'
import form from './form.vue'
import { positionValues } from './form-item'
import type { ComponentSize } from '@/constants'
import type { FormData, FormItemProp } from './types'
import type { ExtractPropTypes } from 'vue'

export const formProps = {
  model: definePropType<FormData>(Object),
  rules: Object,
  labelPosition: {
    type: String,
    values: positionValues,
    default: 'left'
  },
  labelWidth: {
    type: definePropType<string | number>([String, Number])
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
  },
  /**|
   * @description 行内表单
   */
  inline: {
    type: Boolean,
    default: false
  }
} as const

export const formEmit = {
  'update:model': (val: object) => isObject(val),
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isString(prop) || isArray(prop)) && isBoolean(isValid) && isString(message)
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmit = typeof formEmit
export type FormInstance = InstanceType<typeof form>
