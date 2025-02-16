import { withInstall } from '@nocturne-ui/utils'
import dialog from './src/dialog.vue'

export * from './src/dialog'
export const NDialog = withInstall(dialog)
export default NDialog
