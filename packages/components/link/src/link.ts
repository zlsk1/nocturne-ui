import { iconPropType } from '@/utils'
import link from './link.vue'
import { ExtractPropTypes } from 'vue'

export const linkProps = {
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  href: String,
  target: {
    type: String,
    default: '_self'
  },
  underline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: iconPropType
} as const

export type LinkInstance = InstanceType<typeof link>
export type LinkProps = ExtractPropTypes<typeof linkProps>
