import { definePropType } from '@nocturne-ui/utils'
import anchorItem from './anchor.vue'

import type { ExtractPropTypes } from 'vue'
import type { AnchorItems } from './anchor'

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
