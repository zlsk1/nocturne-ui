import dialog from './src/dialog.vue'
import { withInstall } from '@/utils'

export * from './src/dialog'
export const NDialog = withInstall(dialog)
export default NDialog
