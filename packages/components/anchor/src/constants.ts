import type { InjectionKey, Ref } from 'vue'

export type AnchorContext = {
  activedLink: Ref<string>
  onClick: (e: Event, href?: string) => void
  addLink: (el: HTMLElement, href?: string) => void
  removeAnchor: (href?: string) => void
}

export const ANCHOR_INJECTION_KEY: InjectionKey<AnchorContext> =
  Symbol('anchorContext')
