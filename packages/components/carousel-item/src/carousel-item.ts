import carouselItem from './carousel-item.vue'
import type { ExtractPropTypes } from 'vue'

export const carouselItemProps = {

}

export type CarouselItemInstance = InstanceType<typeof carouselItem>
export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps>
