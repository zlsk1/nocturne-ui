import { useTooltipProps } from '@nocturne-ui/components/tooltip'
import { definePropType, isBoolean } from '@nocturne-ui/utils'
import popover from './popover.vue'
import type { ExtractPropTypes, PropType } from 'vue'

export const popoverProps = {
  ...useTooltipProps,
  width: {
    type: definePropType<string | number>([String, Number]),
    default: '160px'
  },
  title: String,
  updateVisible: Function as PropType<(visible: boolean) => void>
}

export const popoverEmit = {
  'update:visible': (value: boolean) => isBoolean(value),
  'after-enter': () => true,
  'after-leave': () => true,
  'before-enter': () => true,
  'before-leave': () => true
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export type PopoverEmit = typeof popoverEmit
export type PopoverInstance = InstanceType<typeof popover>
