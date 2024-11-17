import button from './src/button.vue'
import buttonGroup from './src/button-group.vue'
import { withInstall } from '@/utils'

export * from './src/button'
export * from './src/button-group'
export const NButton = withInstall(button)
export const NButtonGroup = withInstall(buttonGroup)
export default NButton
