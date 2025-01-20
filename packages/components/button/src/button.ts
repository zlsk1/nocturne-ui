import { RiLoaderLine as Loading } from '@remixicon/vue'
import { iconPropType } from '@/utils'
import { componentSizes } from '@/constants'
import Button from './button.vue'
import type { ExtractPropTypes } from 'vue'

export const buttonTypes = [
  'primary',
  'success',
  'warning',
  'info',
  'error',
  'text',
  ''
] as const

export const buttonProps = {
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  size: {
    type: String,
    values: componentSizes,
    default: ''
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: iconPropType
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingIcon: {
    type: iconPropType,
    default: Loading
  },
  text: {
    type: Boolean,
    default: false
  }
} as const

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = ExtractPropTypes<typeof buttonEmits>
export type ButtonInstance = InstanceType<typeof Button>
