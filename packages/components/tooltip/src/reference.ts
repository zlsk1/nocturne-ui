import { popperReferenceProps } from '@/components/popper/src/reference'
import { definePropType } from '@/utils'
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

export type ElTooltipTriggerProps = ExtractPropTypes<
  typeof useTooltipTriggerProps
>
