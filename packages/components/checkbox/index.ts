import checkbox from './src/checkbox.vue'
import checkboxGroup from './src/checkbox-group.vue'
import { withInstall } from '@/utils'

export * from './src/checkbox'
export * from './src/checkbox-group'
export const NCheckbox = withInstall(checkbox)
export const NCheckboxGroup = withInstall(checkboxGroup)
export default NCheckbox
