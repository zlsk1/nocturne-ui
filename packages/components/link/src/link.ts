import { ExtractPropTypes } from 'vue'
import { iconPropType } from '@nocturne-ui/utils'
import link from './link.vue'

export const linkProps = {
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  href: String,
  target: {
    type: String,
    values: ['_self', '_blank', '_parent', '_top'],
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
