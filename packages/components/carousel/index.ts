import carousel from './src/carousel.vue'
import carouselItem from './src/carousel-item.vue'
import { withInstall } from '@/utils'

export * from './src/carousel'
export * from './src/carousel-item'
export const NCarousel = withInstall(carousel)
export const NCarouselItem = withInstall(carouselItem)
export default NCarousel
