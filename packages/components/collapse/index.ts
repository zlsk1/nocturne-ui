import { withInstall } from '@/utils'
import collapse from './src/collapse.vue'
import collapseItem from './src/collapse-item.vue'
import collapseTransition from './src/collapse-transition.vue'

export * from './src/collapse'
export * from './src/collapse-item'
export const NCollapse = withInstall(collapse)
export const NCollapseItem = withInstall(collapseItem)
export const NCollapseTransition = withInstall(collapseTransition)
export default NCollapse
