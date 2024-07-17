import { withInstall } from '@/utils'
import carouselItem from './src/carousel-item.vue'

export * from './src/carousel-item'
export const NCarouselItem = withInstall(carouselItem)
export default NCarouselItem
