import { withInstall } from '@/utils'
import tabs from './src/tabs.vue'
import tabItem from './src/tab-item.vue'

export * from './src/tabs'
export const NTabs = withInstall(tabs)
export const NTabItem = withInstall(tabItem)
export default NTabs
