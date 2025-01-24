import { checkboxProps } from './checkbox'
import checkboxButton from './checkbox-button.vue'
import type { ExtractPropTypes } from 'vue'

export const checkboxButtonProps = {
  ...checkboxProps
} as const

export type CheckboxButtonProps = ExtractPropTypes<typeof checkboxButtonProps>
export type CheckboxButtonInstance = InstanceType<typeof checkboxButton>
