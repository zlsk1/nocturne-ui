import type { InjectionKey, Ref, ToRefs } from 'vue'
import type { CarouselProps } from './carousel'

export type NCarouselInjectionContent = {
  itemCount: Ref<number>
  currentIndex: Ref<number>
  contentRef: Ref<HTMLUListElement | undefined>
  addItem: () => void
} & ToRefs<Pick<CarouselProps, 'mode'>>

export const CAROUSEL_INJECT_KEY: InjectionKey<NCarouselInjectionContent> =
  Symbol('frCarousel')
