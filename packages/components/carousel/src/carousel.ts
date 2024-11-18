import Carousel from './carousel.vue'
import type { ExtractPropTypes } from 'vue'
import { definePropType, isNumber } from '@/utils'

export const carouselProps = {
  height: {
    type: definePropType<number | string>([String, Number]),
    default: 300
  },
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
    values: ['rectangle', 'circle'],
    default: 'rectangle'
  },
  hideIndicator: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    values: ['vertical', 'horizontal'],
    default: 'horizontal'
  },
  indicatorPlacement: {
    type: String,
    values: ['bottom', 'top', 'right', 'left']
  },
  trigger: {
    type: String,
    values: ['click', 'hover'],
    default: 'click'
  },
  loop: {
    type: Boolean,
    default: true
  }
} as const

export const carouselEmits = {
  change: (newIndex: number, oldIndex: number) =>
    isNumber(newIndex) || isNumber(oldIndex)
}

export type CarouselInstance = InstanceType<typeof Carousel>
export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits
