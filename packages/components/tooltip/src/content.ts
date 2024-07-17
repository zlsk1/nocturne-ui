import { popperContentProps } from '@/components/popper/src/content'
import { useDelayedToggleProps } from '@/composables'
import { definePropType } from '@/utils'

import type TooltipContent from './content.vue'
import type { ExtractPropTypes } from 'vue'

export const useTooltipContentProps = {
  ...useDelayedToggleProps,
  ...popperContentProps,
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: 'body'
  },
  content: {
    type: String,
    default: ''
  },
  rawContent: {
    type: Boolean,
    default: false
  },
  persistent: Boolean,
  ariaLabel: {
    type: String,
    default: ''
  },
  visible: {
    type: definePropType<boolean | null>(Boolean),
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: Boolean
} as const

export type TooltipContentProps = ExtractPropTypes<typeof useTooltipContentProps>

export type TooltipContentInstance = InstanceType<typeof TooltipContent>
