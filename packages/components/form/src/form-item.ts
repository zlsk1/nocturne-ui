import formItem from './form-item.vue'
import type { ExtractPropTypes } from 'vue'
import { definePropType } from '@/utils'

export const positionValues = ['left', 'right', 'top', '']

export const formItemProps = {
  label: String,
  labelPosition: {
    type: String,
    values: positionValues,
    default: 'left'
  },
  rules: Object,
  prop: {
    type: String,
    validate: (val: any, props: any) => props.rules.keys.includes(val)
  },
  labelWidth: {
    type: definePropType<string | number>([String, Number]),
    default: ''
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemInstance = InstanceType<typeof formItem>
