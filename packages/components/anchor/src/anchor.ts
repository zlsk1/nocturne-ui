import { isString, isUndefined } from 'lodash'
import { definePropType } from '@nocturne-ui/utils'
import anchor from './anchor.vue'
import type { ExtractPropTypes } from 'vue'

export const anchorProps = {
  container: {
    type: definePropType<string | HTMLElement | Window | null>([String, Object])
  },
  marker: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 300
  },
  bound: {
    type: Number,
    default: 15
  },
  direction: {
    type: definePropType<'vertical' | 'horizontal'>(String),
    default: 'vertical'
  }
} as const

export const anchorEmits = {
  change: (href: string) => isString(href),
  click: (e: Event, href?: string) =>
    isString(href) || (isUndefined(href) && e instanceof Event)
}

export type AnchorProps = ExtractPropTypes<typeof anchorProps>
export type AnchorEmits = typeof anchorEmits
export type AnchorInstance = typeof anchor
