import type { ComputedRef, InjectionKey } from 'vue'

export type NRowInjectionKey = {
  gutter: ComputedRef<number>
}

export const ROW_INJECTION_KEY: InjectionKey<NRowInjectionKey> = Symbol('row')
