import type { ComponentPublicInstance, ComputedRef, InjectionKey } from 'vue'
import type { TabType, TabsProps } from './props'

export type NTabInjectionContent = {
  activeTab: TabType
  tabs: TabType[]
  updateActiveTab: (tab: TabType) => void
} & TabsProps

export const TAB_INJECT_KEY: InjectionKey<NTabInjectionContent> = Symbol('NTab')

export type NTabNavInjectionContent = {
  hiddenTabs: ComputedRef<TabType[]>
  setRef: (el: Element | ComponentPublicInstance | null, label: string) => void
  jumpToTab: (tab: TabType) => void
}

export const TAB_NAV_INJECT_KEY: InjectionKey<NTabNavInjectionContent> =
  Symbol('NTabNav')
