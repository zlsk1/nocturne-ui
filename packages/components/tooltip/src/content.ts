import { popperContentProps } from '@nocturne-ui/components/popper/src/content'
import { useDelayedToggleOptions } from '@nocturne-ui/composables'
import { definePropType } from '@nocturne-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type TooltipContent from './content.vue'

export const useTooltipContentProps = {
  ...useDelayedToggleOptions,
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

export type TooltipContentProps = ExtractPropTypes<
  typeof useTooltipContentProps
>

export type TooltipContentInstance = InstanceType<typeof TooltipContent>
