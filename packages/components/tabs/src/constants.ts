import type { InjectionKey } from 'vue'
import type { TabType, TabsProps } from './tabs'

export type NTabInjectionContent = {
  disabled: TabsProps['disabled']
  activeTab: TabType | undefined
  updateActiveTab: (tab: TabType) => void
  addLabel: ({ label, slot }: TabType) => void
}

export const TAB_INJECT_KEY: InjectionKey<NTabInjectionContent> = Symbol('NTab')
