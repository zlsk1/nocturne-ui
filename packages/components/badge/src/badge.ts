import { ExtractPropTypes } from 'vue'
import Badge from './badge.vue'
import { definePropType } from '@/utils'

export const badgeProps = {
  value: {
    type: definePropType<string | number>([String, Number]),
    required: true
  },
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', ''],
    default: ''
  },
  dot: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number,
    default: 99
  }
} as const

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
export type BadgeInstance = InstanceType<typeof Badge>
