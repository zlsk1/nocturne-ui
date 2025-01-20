import { withInstall } from '@/utils'
import popper from './src/popper.vue'

export const NPopper = withInstall(popper)
export * from './src/arrow'
export * from './src/content'
export * from './src/popper'
export * from './src/reference'
export default NPopper
