import type { InjectionKey, Ref } from 'vue'

export type FrCollapseInjection = {
  activelist: Ref<string[] | number[]>,
  changeEvent: (val: string | number) => void
}

export const COLLAPSE_INJECTION_KEY: InjectionKey<FrCollapseInjection> =
  Symbol('collapse')
