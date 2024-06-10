import { createModelToggleComposable } from '@/composables'
import { popperArrowProps } from '@/components/popper/src/arrow.js'
import { popperProps } from '@/components/popper/src/popper.js'
import { useTooltipContentProps } from './content'
import { useTooltipTriggerProps } from './reference'
import type Tooltip from './tooltip.vue'

import type { ExtractPropTypes } from 'vue'

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

export type ElTooltipProps = ExtractPropTypes<typeof useTooltipProps>

export type TooltipInstance = InstanceType<typeof Tooltip>