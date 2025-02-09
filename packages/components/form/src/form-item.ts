import { definePropType } from '@/utils'
import { componentSizes } from '@/constants'
import formItem from './form-item.vue'
import type { ExtractPropTypes } from 'vue'
import type { ComponentSize } from '@/constants'

export const positionValues = ['left', 'right', 'top', '']

export const formItemProps = {
  label: String,
  labelPosition: {
    type: String,
    values: positionValues
  },
  rules: Object,
  prop: {
    type: String,
    validate: (val: any, props: any) => props.rules.keys.includes(val)
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
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemInstance = InstanceType<typeof formItem>
