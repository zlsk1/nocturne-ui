import type { ExtractPropTypes } from 'vue'
import Carousel from './carousel.vue'
import { isNumber } from '@/utils'

export const carouselProps = {
  height: [String, Number],
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  indicatorShape: {
    type: String,
    values: ['rectangle', 'round'],
    default: 'rectangle'
  },
  hideIndicator: {
    type: Boolean,
    default: false
  }
}

export const carouselEmits = {
  change: (newVal: number, oldVal: number) => isNumber(newVal) || isNumber(oldVal)
}

export type CarouselInstance = InstanceType<typeof Carousel>
export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits
