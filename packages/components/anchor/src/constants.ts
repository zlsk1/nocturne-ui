import type { InjectionKey, Ref } from 'vue'

export type AnchorContext = {
  activeLink: Ref<string>
  onClick: (e: Event) => void
  addLink: (el: HTMLElement, top: number, href?: string) => void
  removeAnchor: (ele?: HTMLElement) => void
}

export const ANCHOR_INJECTION_KEY: InjectionKey<AnchorContext> =
  Symbol('popperContent')
