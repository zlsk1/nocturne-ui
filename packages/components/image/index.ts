import { withInstall } from '@nocturne-ui/utils'
import Image from './src/image.vue'
import ImageViewer from './src/image-viewer.vue'

export * from './src/image'
export * from './src/image-viewer'
export * from './src/constants'

export const NImage = withInstall(Image)
export const NImageViewer = withInstall(ImageViewer)

export default NImage
