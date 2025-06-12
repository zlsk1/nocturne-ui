import type { OptionProps } from './option'

export type SelectMergedValue = SelectSingleValue | SelectMultipleValue

export type SelectMultipleValue = string[] | number[] | object[]

export type SelectSingleValue = string | number | object

export type SelectFilterMethod = ({
  input,
  option
}: {
  input: string
  option: OptionProxy
}) => boolean

export type OptionLabel = string | number

export type OptionProxy = {
  value: OptionProps['value']
  label: OptionProps['label']
  disabled?: OptionProps['disabled']
}
