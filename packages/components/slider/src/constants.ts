import type { InjectionKey, Ref } from 'vue'

export type FrSliderInjectionContent = {
  sliderRef: Ref<HTMLDivElement | undefined>,
  positionPercent: Ref<number>
}

export const SLIDER_INJECT_KEY: InjectionKey<FrSliderInjectionContent> =
  Symbol('FrSlider')
