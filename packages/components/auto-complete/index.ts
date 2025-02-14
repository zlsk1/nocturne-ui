import { withInstall } from '@/utils'
import autoComplete from './src/auto-complete.vue'

export * from './src/auto-complete'
export const NAutoComplete = withInstall(autoComplete)
export default NAutoComplete
