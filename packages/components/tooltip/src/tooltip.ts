import { useTooltipContentProps } from './content'
import { useTooltipTriggerProps } from './reference'
import Tooltip from './tooltip.vue'

import type { ExtractPropTypes } from 'vue'
import { popperProps } from '@/components/popper/src/popper'
import { popperArrowProps } from '@/components/popper/src/arrow'
import { createModelToggleComposable } from '@/composables'

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = createModelToggleComposable('visible' as const)

export const useTooltipProps = {
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,

  showArrow: {
    type: Boolean,
    default: true
  }
}

export const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close'
]

export type TooltipProps = ExtractPropTypes<typeof useTooltipProps>

export type TooltipInstance = InstanceType<typeof Tooltip>
