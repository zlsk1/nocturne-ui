import type { InjectionKey, Ref } from 'vue'

export type FrSliderInjectionContent = {
  sliderRef: Ref<HTMLDivElement | undefined>,
  positionPercent: Ref<string>
}

export const SLIDER_INJECT_KEY: InjectionKey<FrSliderInjectionContent> =
  Symbol('FrSlider')
