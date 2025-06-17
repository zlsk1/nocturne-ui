import cardMeta from './card-meta.vue'

import type { ExtractPropTypes } from 'vue'

export const cardMetaProps = {
  title: String,
  description: String,
  avatar: String
} as const

export type CardMetaProps = ExtractPropTypes<typeof cardMetaProps>
export type CardMetaInstance = typeof cardMeta
