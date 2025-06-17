import { definePropType } from '@nocturne-ui/utils'
import card from './card.vue'
import type { CardMetaProps } from './card-meta'

import type { ExtractPropTypes } from 'vue'

export const cardProps = {
  title: String,
  contentClass: String,
  cover: String,
  hoverable: {
    type: Boolean,
    default: false
  },
  borderless: {
    type: Boolean,
    default: false
  },
  meta: {
    type: definePropType<CardMetaProps>(Object),
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: definePropType<'default' | 'small' | ''>(String),
    default: ''
  }
} as const

export type CardProps = ExtractPropTypes<typeof cardProps>
export type CardInstance = typeof card
