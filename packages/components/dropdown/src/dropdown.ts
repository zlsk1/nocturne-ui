import { placements } from '@popperjs/core'
import { TooltipTriggerType } from '@/components/tooltip'
import { definePropType, isBoolean } from '@/utils'
import { ClassType } from '@/components/popper'
import Dropdown from './dropdown.vue'
import type { ExtractPropTypes } from 'vue'
import type { Options } from '@popperjs/core'

export const dropdownProps = {
  trigger: {
    type: definePropType<TooltipTriggerType>([String]),
    values: ['hover', 'focus', 'click', 'contextmenu'],
    default: 'hover'
  },
  placement: {
    type: String,
    values: placements,
    default: 'bottom'
  },
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object])
  },
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => {
      return {}
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  tabindex: {
    type: definePropType<number | string>([Number, String])
  },
  hideAfterClick: {
    type: Boolean,
    default: true
  }
} as const

export const dropdownEmit = {
  visibleChange: (visible: boolean) => isBoolean(visible),
  click: (e: Event) => e instanceof Event
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownInstance = InstanceType<typeof Dropdown>
export type DropdownEmit = typeof dropdownEmit
