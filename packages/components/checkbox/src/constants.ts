import type { InjectionKey, ToRefs, WritableComputedRef } from 'vue'
import type { CheckboxGroupProps } from './checkbox-group'

export type CheckboxGroupContext = {
  modelValue?: WritableComputedRef<any>
  changeEvent?: (...args: any) => any
  value?: any
} & ToRefs<CheckboxGroupProps>

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('checkboxGroupContextKey')
