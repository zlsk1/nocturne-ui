import { createModelToggleComposable } from '@/compoables'
import { popperArrowProps } from '@/components/popper/src/arrow.js'
import { popperProps } from '@/components/popper/src/popper.js'
import { useTooltipContentProps } from './content'
import { useTooltipTriggerProps } from './reference'

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = createModelToggleComposable('visible')

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
