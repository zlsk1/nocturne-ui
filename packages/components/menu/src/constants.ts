import { NMenuInjectionContext } from './types'
import type { InjectionKey } from 'vue'

export const NMENU_INJECTION_KEY: InjectionKey<NMenuInjectionContext> =
  Symbol('NMenu')
