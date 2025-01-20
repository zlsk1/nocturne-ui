import { withInstall } from '@/utils'
import Dropdown from './src/dropdown.vue'
import DropdownItem from './src/dropdown-item.vue'

export * from './src/dropdown-item'
export * from './src/dropdown'
export * from './src/constants'
export const NDropdown = withInstall(Dropdown)
export const NDropdownItem = withInstall(DropdownItem)
