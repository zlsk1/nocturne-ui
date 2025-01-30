import type { InjectionKey } from 'vue'
import type { SelectProps } from './select'
import type { OptionProps } from './option'

export type NSelectInjectionContext = {
  multipleValue: any[]
  // singleValue: string
  inputValue: string
  options: Map<any, any>
  optionsArray: any[]
  hoveringIndex: number
  valueKey: SelectProps['valueKey']
  multiple: SelectProps['multiple']
  filterable: SelectProps['filterable']
  clickOption: (vm: OptionProxy) => void
  createOption: (vm: OptionProxy) => void
}
export type OptionProxy = {
  value: OptionProps['value']
  label: OptionProps['label']
  disabled: OptionProps['disabled']
}

export const SELECT_INJECTION_KEY: InjectionKey<NSelectInjectionContext> =
  Symbol('select')
