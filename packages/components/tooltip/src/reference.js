import { popperReferenceProps } from '@/components/popper/src/reference.js'

export const useTooltipTriggerProps = {
  ...popperReferenceProps,
  disabled: Boolean,
  trigger: {
    type: String,
    values: ['hover', 'focus', 'click', 'contextmenu'],
    default: 'hover'
  },
  triggerKeys: {
    type: Array,
    default: () => ['Enter', 'Space']
  }
}

