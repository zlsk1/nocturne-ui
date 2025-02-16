import { withInstall } from '@nocturne-ui/utils'
import checkbox from './src/checkbox.vue'
import checkboxButton from './src/checkbox-button.vue'
import checkboxGroup from './src/checkbox-group.vue'

export * from './src/checkbox'
export * from './src/checkbox-group'
export const NCheckbox = withInstall(checkbox)
export const NCheckboxButton = withInstall(checkboxButton)
export const NCheckboxGroup = withInstall(checkboxGroup)
export default NCheckbox
