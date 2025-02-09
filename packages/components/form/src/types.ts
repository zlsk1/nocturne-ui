import type { RuleItem, ValidateFieldsError } from 'async-validator'
import type { FormProps } from './form'
import type { FormItemProps } from './form-item'

export interface RuleItemWithTrigger extends RuleItem {
  trigger: TriggerType
}

export type FormValidateCallback = (
  valid: boolean,
  fields?: ValidateFieldsError
) => void

export type TriggerType = 'blur' | 'change'

export type NFormInjectionContext = {
  maxLabelWidth: number
  labelPosition: FormProps['labelPosition']
  labelWidth: string | number
  disabled: boolean
  size?: FormProps['size']
  model?: FormProps['model']
  rules?: FormProps['rules']
  requiredMark?: FormProps['requiredMark']
  emit: (
    event: 'validate',
    prop: string,
    isValid: boolean,
    message: string
  ) => void
  addField: (formItemContext: NFormItemInjectionContext) => void
}

export type NFormItemInjectionContext = {
  labelId: string
  labelWidth: number
  disabled: boolean
  validateStatus: boolean | undefined
  prop?: FormItemProps['prop']
  size?: FormItemProps['size']
  validate: (callback?: FormValidateCallback) => Promise<true | void>
  resetField: () => Promise<void>
  clearValidate: () => void
}

export type FormValidate = (
  callback: FormValidateCallback | undefined
) => Promise<boolean>

export type FormClearField = (props: FormItemProps['prop']) => void

export type FormValidateField = (
  props: FormItemProps['prop'],
  callback: FormValidateCallback | undefined
) => Promise<boolean>

export type FormScrollToField = (prop: string, options?: ScrollOptions) => void
