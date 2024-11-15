import type { InjectionKey, Ref } from 'vue'

export type NCollapseInjection = {
  activelist: Ref<string[] | number[]>
  changeEvent: (val: string | number) => void
}

export const COLLAPSE_INJECTION_KEY: InjectionKey<NCollapseInjection> =
  Symbol('collapse')
