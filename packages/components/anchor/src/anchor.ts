import { isString, isUndefined } from 'lodash'
import anchor from './anchor.vue'
import type { ExtractPropTypes } from 'vue'
import { definePropType } from '@/utils'

export type AnchorItems = {
  href: string
  text: string
  title?: string
  children?: Omit<AnchorItems, 'chidlren'>[]
}

export const anchorProps = {
  items: {
    type: definePropType<AnchorItems[]>(Array)
  },
  marker: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 70
  }
}

export const anchorEmits = {
  change: (href: string) => isString(href),
  click: (e: Event, href?: string) =>
    isString(href) || (isUndefined(href) && e instanceof Event)
}

export type AnchorProps = ExtractPropTypes<typeof anchorProps>
export type AnchorEmits = typeof anchorEmits
export type AnchorInstance = typeof anchor
