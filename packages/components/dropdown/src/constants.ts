import type { InjectionKey } from 'vue'

export type NDropdownContext = {
  handleClick: (e: Event) => void
}

export const NDROPDOWN_INJECTION_KEY: InjectionKey<NDropdownContext> =
  Symbol('n-dropdown')
