import { definePropType } from '@/utils'
import { componentSizes } from '@/constants'
import formItem from './form-item.vue'
import type { ExtractPropTypes } from 'vue'
import type { ComponentSize } from '@/constants'
import type { FormItemProp, FormItemRule } from './types'
import type { Arrayable } from '@/utils'

export const positionValues = ['left', 'right', 'top', '']

export const formItemProps = {
  label: String,
  labelPosition: {
    type: String,
    values: positionValues
  },
  rule: definePropType<Arrayable<FormItemRule>>(Object),
  prop: {
    type: definePropType<FormItemProp>([Array, String])
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
  required: {
    type: Boolean,
    default: false
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemInstance = InstanceType<typeof formItem>
