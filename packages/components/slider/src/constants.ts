import type { InjectionKey, Ref } from 'vue'

export type NSliderInjectionContent = {
  sliderRef: Ref<HTMLDivElement | undefined>,
  positionPercent: Ref<number>
}

export const SLIDER_INJECT_KEY: InjectionKey<NSliderInjectionContent> =
  Symbol('NSlider')
