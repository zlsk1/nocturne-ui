import DropdownItem from './dropdown.vue'
import type { ExtractPropTypes } from 'vue'
import { iconPropType } from '@/utils'

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
  }
} as const

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
