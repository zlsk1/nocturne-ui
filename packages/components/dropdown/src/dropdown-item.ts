import { iconPropType } from '@nocturne-ui/utils'
import DropdownItem from './dropdown.vue'
import type { ExtractPropTypes } from 'vue'

export const dropdownItemProps = {
  disabled: {
    type: Boolean,
    default: false
  },
  divided: {
    type: Boolean,
    default: false
  },
  icon: {
    type: iconPropType
  },
  label: {
    type: String,
    required: true
  }
} as const

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
