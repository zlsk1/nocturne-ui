import { popperContentProps } from '@/components/popper/src/content'
import { useDelayedToggleProps } from '@/compoables'

export const useTooltipContentProps = {
  ...useDelayedToggleProps,
  ...popperContentProps,
  appendTo: {
    type: String,
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
    type: [Boolean, null],
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: Boolean
}
