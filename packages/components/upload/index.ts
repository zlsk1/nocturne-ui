import { withInstall } from '@nocturne-ui/utils'
import Upload from './src/upload.vue'

export * from './src/types'
export * from './src/upload'
export const NUpload = withInstall(Upload)
export default NUpload
