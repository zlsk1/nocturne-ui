import anchor from './src/anchor.vue'
import anchorItem from './src/anchor-item.vue'
import { withInstall } from '@/utils'

export * from './src/anchor'
export const NAnchor = withInstall(anchor)
export const NAnchorItem = withInstall(anchorItem)
export default NAnchor
