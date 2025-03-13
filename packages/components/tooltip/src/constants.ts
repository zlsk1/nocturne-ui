import type { InjectionKey, Ref } from 'vue'
import type { TooltipTriggerType } from './trigger'

export type NTooltipInjectionContext = {
  controlled: Ref<boolean>
  id: Ref<string>
  open: Ref<boolean>
  trigger: Ref<TooltipTriggerType>
  onOpen: (e?: Event) => void
  onClose: (e?: Event) => void
  onToggle: (e: Event) => void
  onShow: () => void
  onHide: () => void
  onBeforeShow: () => void
  onBeforeHide: () => void
  updatePopper: () => void
}

export const TOOLTIP_INJECTION_KEY: InjectionKey<NTooltipInjectionContext> =
  Symbol('elTooltip')
