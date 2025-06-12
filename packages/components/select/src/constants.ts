import type { InjectionKey } from 'vue'
import type { SelectProps } from './select'
import type { OptionProxy } from './types'

export type NSelectInjectionContext = {
  multipleValue: any[]
  inputValue: string
  options: Map<any, any>
  optionsArray: any[]
  hoveringIndex: number
  filteredValue: string
  clickOption: (vm: OptionProxy) => void
  createOption: (vm: OptionProxy) => void
  getOptionValue: (val: any) => any
} & SelectProps

export const SELECT_INJECTION_KEY: InjectionKey<NSelectInjectionContext> =
  Symbol('select')
