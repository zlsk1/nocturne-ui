import type { InjectionKey, Ref } from 'vue'

export type NDropdownContext = {
  selected: Ref<undefined | string>
  handleClick: (e: MouseEvent, label: string) => void
}

export const NDROPDOWN_INJECTION_KEY: InjectionKey<NDropdownContext> =
  Symbol('n-dropdown')
