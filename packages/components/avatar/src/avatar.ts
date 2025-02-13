import { definePropType, iconPropType } from '@/utils'
import { componentSizes } from '@/constants'
import Avatar from './avatar.vue'
import type { ExtractPropTypes } from 'vue'

const shape = ['circle', 'square'] as const
type fit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export const avatarProps = {
  shape: {
    type: String,
    values: shape,
    default: 'circle'
  },
  size: {
    type: definePropType<string | number>([String, Number]),
    values: componentSizes
  },
  icon: iconPropType,
  src: String,
  alt: String,
  fit: {
    type: definePropType<fit>(String),
    default: 'cover'
  }
} as const

export type AvatarProps = ExtractPropTypes<typeof avatarProps>

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event
}

export type AvatarEmits = typeof avatarEmits
export type AvatarInstance = InstanceType<typeof Avatar>
