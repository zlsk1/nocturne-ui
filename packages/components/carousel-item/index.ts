import { withInstall } from '@/utils'
import carouselItem from './src/carousel-item.vue'

export * from './src/carousel-item'
export const FrCarouselItem = withInstall(carouselItem)
export default FrCarouselItem
