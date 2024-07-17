import type { InjectionKey, Ref } from 'vue'
import type { SelectProps } from './select'
import type { OptionProps } from '@/components/option'

export type NSelectInjectionContext = {
  actualVal: Ref<SelectProps['modelValue']>,
  options: Map<any, any>,
  valueKey: SelectProps['valueKey'],
  multiple: SelectProps['multiple'],
  clickOption: (vm: OptionProxy) => void
}
export type OptionProxy = {
  value: OptionProps['value'],
  label: OptionProps['label'],
  disabled: OptionProps['disabled']
}

export const SELECT_INJECTION_KEY: InjectionKey<NSelectInjectionContext> =
  Symbol('elTooltip')
