import type { InjectionKey, Ref } from 'vue'

export type NCarouselInjectionContent = {
  itemCount: Ref<number>
  currentIndex: Ref<number>
  contentRef: Ref<HTMLUListElement | undefined>
}

export const CAROUSEL_INJECT_KEY: InjectionKey<NCarouselInjectionContent> =
  Symbol('frCarousel')
