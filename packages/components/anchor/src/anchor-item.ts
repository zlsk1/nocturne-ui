import anchorItem from './anchor.vue'

import type { ExtractPropTypes } from 'vue'

export const anchorItemProps = {
  href: String,
  title: String
} as const

export type AnchorItemProps = ExtractPropTypes<typeof anchorItemProps>
export type AnchorItemInstance = typeof anchorItem
