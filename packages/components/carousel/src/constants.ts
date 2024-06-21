import type { InjectionKey, Ref } from 'vue'

export type FrCarouselInjectionContent = {
  itemCount: Ref<number>,
  currentIndex: Ref<number>,
  contentRef: Ref<HTMLUListElement | undefined>,
}

export const CAROUSEL_INJECT_KEY: InjectionKey<FrCarouselInjectionContent> =
  Symbol('frCarousel')
