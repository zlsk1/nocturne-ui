import DropdownItem from './dropdown.vue'
import { iconPropType } from '@/utils'
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
  }
} as const

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
