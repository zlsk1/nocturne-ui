import { ExtractPropTypes } from 'vue'
import { definePropType } from '@nocturne-ui/utils'
import { componentSizes } from '@nocturne-ui/constants'
import { CheckModelValueType } from './checkbox'
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
  label: String,
  buttonType: {
    type: definePropType<'default' | 'solid'>(String)
  }
} as const

export const checkboxGroupEmits = {
  change: (val: CheckboxGroupValueType) => Array.isArray(val),
  'update:modelValue': (val: CheckboxGroupValueType) => Array.isArray(val)
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = ExtractPropTypes<typeof checkboxGroupEmits>
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>
