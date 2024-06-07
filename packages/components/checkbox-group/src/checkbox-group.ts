import { ExtractPropTypes } from 'vue'
import { CheckModelValueType } from '../../checkbox/src/checkbox'
import { definePropType } from '@/utils'
import { componentSizes } from '@/constants'
import CheckboxGroup from './checkbox-group.vue'

export type CheckboxGroupValueType = Exclude<CheckModelValueType, boolean>[]

export const checkboxGroupProps = {
  modelValue: {
    type: definePropType<CheckboxGroupValueType>(Array),
    default: []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    values: componentSizes
  },
  max: Number,
  min: Number,
  textColor: String,
  fill: String,
  label: String
} as const

export const checkboxGroupEmits = {
  change: (val: CheckboxGroupValueType) => Array.isArray(val),
  'update:modelValue': (val: CheckboxGroupValueType) => Array.isArray(val)
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = ExtractPropTypes<typeof checkboxGroupEmits>
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>
