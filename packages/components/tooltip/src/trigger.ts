import { popperReferenceProps } from '@nocturne-ui/components/popper/src/trigger'
import { definePropType } from '@nocturne-ui/utils'
import type { ExtractPropTypes } from 'vue'

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu'

export const useTooltipTriggerProps = {
  ...popperReferenceProps,
  disabled: Boolean,
  trigger: {
    type: definePropType<TooltipTriggerType>([String, Array]),
    values: ['hover', 'focus', 'click', 'contextmenu'],
    default: 'hover'
  },
  triggerKeys: {
    type: definePropType<string[]>(Array),
    default: () => ['Enter', 'Space']
  }
} as const

export type TooltipTriggerProps = ExtractPropTypes<
  typeof useTooltipTriggerProps
>
