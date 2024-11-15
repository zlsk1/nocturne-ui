import anchorItem from './anchor.vue'

import type { ExtractPropTypes } from 'vue'
import type { AnchorItems } from './anchor'
import { definePropType } from '@/utils'

export const anchorItemProps = {
  items: {
    type: definePropType<AnchorItems[]>(Array)
  },
  href: String,
  text: String,
  title: String
}

export type AnchorItemProps = ExtractPropTypes<typeof anchorItemProps>
export type AnchorItemInstance = typeof anchorItem
