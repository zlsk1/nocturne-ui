import type { InjectionKey, Ref } from 'vue'

export type NDropdownContext = {
  selected: Ref<undefined | string>
  handleSelect: (label: string) => void
}

export const NDROPDOWN_INJECTION_KEY: InjectionKey<NDropdownContext> =
  Symbol('n-dropdown')
