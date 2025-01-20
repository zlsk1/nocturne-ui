import { withInstall } from '@/utils'
import treeSelect from './src/tree-select.vue'

export * from './src/tree-select'
export const NTreeSelect = withInstall(treeSelect)
export default NTreeSelect
