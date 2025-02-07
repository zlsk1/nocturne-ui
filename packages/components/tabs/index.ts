import { withInstall } from '@/utils'
import tabs from './src/tabs'
import tabPane from './src/tab-pane-list/tab-pane.vue'

export * from './src/props'
export * from './src/props.pane'
export const NTabs = withInstall(tabs)
export const NTabPane = withInstall(tabPane)
export default NTabs
