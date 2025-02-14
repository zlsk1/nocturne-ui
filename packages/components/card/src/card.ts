import card from './card.vue'

import type { ExtractPropTypes } from 'vue'

export const cardProps = {
  header: String,
  footer: String,
  contentClass: String
}

export type CardProps = ExtractPropTypes<typeof cardProps>
export type CardInstance = typeof card
