import type { InjectionKey, Ref } from 'vue'

export interface Position {
  top: number,
  left: number
}

export type FrScrollbarInjectionContext = {
  position: Ref<Position>,
}

export const SCROLLBAR_INJECTION_KEY: InjectionKey<FrScrollbarInjectionContext> =
  Symbol('elTooltip')
