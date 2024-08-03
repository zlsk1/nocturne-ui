import type { RuleItem, ValidateFieldsError } from 'async-validator'
import type { FormProps } from './form'
import type { FormItemProps } from './form-item'

export interface RuleItemWithTrigger extends RuleItem {
  trigger: TriggerType
}

export type Callback = (valid: boolean, fields?: ValidateFieldsError) => void

export type TriggerType = 'blur' | 'change'

export type NFormInjectionContext = {
  model?: FormProps['model'],
  rules?: FormProps['rules'],
  maxLabelWidth: number,
  labelPosition: FormProps['labelPosition'],
  labelWidth: string | number
  addField: (formItemContext: NFormItemInjectionContext) => void,
}

export type NFormItemInjectionContext = {
  labelId: string,
  prop?: FormItemProps['prop'],
  labelWidth: number,
  validate: (callback?: Callback) => Promise<true | void>,
  resetField: () => Promise<void>,
  clearField: () => void
}
