import type { InjectionKey } from 'vue'
import type { SelectProps } from './select'
import type { OptionProps } from './option'

export type NSelectInjectionContext = {
  multipleValue: any[]
  inputValue: string
  options: Map<any, any>
  optionsArray: any[]
  hoveringIndex: number
  filterable: boolean
  valueKey: SelectProps['valueKey']
  multiple: SelectProps['multiple']
  modelValue: SelectProps['modelValue']
  filterOption: SelectProps['filterOption']
  clickOption: (vm: OptionProxy) => void
  createOption: (vm: OptionProxy) => void
  getOptionValue: (val: any) => any
}

export type OptionProxy = {
  value: OptionProps['value']
  label: OptionProps['label']
  disabled?: OptionProps['disabled']
}

export const SELECT_INJECTION_KEY: InjectionKey<NSelectInjectionContext> =
  Symbol('select')
