import { withInstall } from '@/utils'
import anchor from './src/anchor.vue'
import anchorItem from './src/anchor-item.vue'

export * from './src/anchor'
export const NAnchor = withInstall(anchor, { anchorItem })
export const NAnchorItem = withInstall(anchorItem)
export default NAnchor
