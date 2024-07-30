import formItem from './form-item.vue'

import type { ExtractPropTypes } from 'vue'

export const formItemProps = {
  label: String,
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top', ''],
    default: 'left'
  },
  rules: Object,
  prop: {
    type: String,
    validate: (val: any, props: any) => props.rules.keys.includes(val)
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemInstance = InstanceType<typeof formItem>
