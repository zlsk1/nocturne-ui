import type { InjectionKey, Ref } from 'vue'
import type { FormProps } from './form'

export type NFormInjectionContext = {
  formData: FormProps['model'],
  formRules: FormProps['rules'],
}

export type NFormItemInjectionContext = {
  labelId: string,
}

export const FORM_INJECTION_KEY: InjectionKey<NFormInjectionContext> = Symbol('NForm')
export const FORMITEM_INJECTION_KEY: InjectionKey<NFormItemInjectionContext> = Symbol('NFormItem')

