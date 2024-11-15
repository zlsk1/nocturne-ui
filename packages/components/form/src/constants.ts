import type { InjectionKey } from 'vue'
import type { NFormInjectionContext, NFormItemInjectionContext } from './types'

export const FORM_INJECTION_KEY: InjectionKey<NFormInjectionContext> =
  Symbol('NForm')
export const FORMITEM_INJECTION_KEY: InjectionKey<NFormItemInjectionContext> =
  Symbol('NFormItem')
