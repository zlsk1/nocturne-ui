import { ExtractPropTypes } from 'vue'
import { componentSizes } from '@nocturne-ui/constants'
import { iconPropType } from '@nocturne-ui/utils'
import tag from './tag.vue'

export const tagProps = {
  size: {
    type: String,
    values: componentSizes
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  round: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  effect: {
    type: String,
    values: ['dark', 'light', 'plain'],
    default: 'light'
  },
  transition: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: true
  },
  color: String,
  icon: {
    type: iconPropType
  }
} as const

export const tagEmits = {
  close: (e: Event) => e instanceof Event,
  click: (e: Event) => e instanceof Event
}

export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagEmits = typeof tagEmits
export type TagInstance = InstanceType<typeof tag>
