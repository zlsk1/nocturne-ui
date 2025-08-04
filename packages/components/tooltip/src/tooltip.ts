import { popperProps } from '@nocturne-ui/components/popper/src/popper'
import { popperArrowProps } from '@nocturne-ui/components/popper/src/arrow'
import { createModelToggleComposable } from '@nocturne-ui/composables'
import { useTooltipContentProps } from './content'
import { useTooltipTriggerProps } from './trigger'
import Tooltip from './tooltip.vue'

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
  },
  hideAfter: {
    type: Number,
    default: 120
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
