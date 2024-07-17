import type { InjectionKey } from 'vue'
import type { RadioGroupProps } from './radio-group'

export interface NRadioInjectionContext extends RadioGroupProps {
  changeGroup: (val: any) => void
}

export const RADIOGROUP_INJECTION_KEY: InjectionKey<NRadioInjectionContext> = Symbol('frRadioGroup')

