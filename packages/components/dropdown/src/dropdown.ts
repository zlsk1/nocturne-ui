import { type ExtractPropTypes, Teleport } from 'vue'
import { placements } from '@popperjs/core'
import { TooltipTriggerType } from '@nocturne-ui/components/tooltip'
import { definePropType, isBoolean, isString } from '@nocturne-ui/utils'
import { ClassType } from '@nocturne-ui/components/popper'
import Dropdown from './dropdown.vue'
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
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hideAfterClick: {
    type: Boolean,
    default: true
  },
  showArrow: {
    type: Boolean,
    default: false
  },
  selectable: {
    type: Boolean,
    default: false
  },
  persistent: {
    type: Boolean,
    default: true
  },
  /**
   * @description only for selectable
   */
  modelValue: String,
  teleported: {
    type: Boolean,
    default: true
  }
} as const

export const dropdownEmit = {
  visibleChange: (visible: boolean) => isBoolean(visible),
  select: (label: string) => isString(label),
  'update:modelValue': (label: string) => isString(label)
}

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownInstance = InstanceType<typeof Dropdown>
export type DropdownEmit = typeof dropdownEmit
