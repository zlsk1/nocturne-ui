import type { RuleItem, ValidateFieldsError } from 'async-validator'
import type { FormProps } from './form'
import type { FormItemProps } from './form-item'
import type { Arrayable } from '@/utils'

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<TriggerType>
}

export type FormValidateCallback = (
  valid: boolean,
  fields?: ValidateFieldsError
) => void

export type TriggerType = 'blur' | 'change'

export type NFormInjectionContext = {
  maximumLabelWidth: number
  emit: (
    event: 'validate',
    prop: FormItemProp,
    isValid: boolean,
    message: string
  ) => void
  addField: (formItemContext: NFormItemInjectionContext) => void
} & FormProps

export type NFormItemInjectionContext = {
  labelWidth: number
  labelId: string
  validateStatus: boolean | undefined
  validate: (callback?: FormValidateCallback) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
} & Omit<FormItemProps, 'labelWidth'>

export type FormValidate = (
  callback: FormValidateCallback | undefined
) => Promise<boolean>

export type FormClearValidate = (props: FormItemProp) => void

export type FormValidateField = (
  props: FormItemProp,
  callback: FormValidateCallback | undefined
) => Promise<boolean>

export type FormScrollToField = (prop: string, options?: ScrollOptions) => void

export type FormData = Record<string, any>

// export type FormRules = Record<
//   string,
//   RuleItemWithTrigger | RuleItemWithTrigger[]
// >

export type FormItemProp = Arrayable<string>
