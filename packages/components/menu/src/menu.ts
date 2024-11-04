import Menu from './menu.vue'
import { definePropType } from '@/utils'

import type { ExtractPropTypes, ComputedRef, StyleValue } from 'vue'
import type { TooltipTriggerType } from '@/components/tooltip'
import type { ClassType } from '@/components/popper'

export const menuProps = {
  direction: {
    type: String,
    default: 'horizonal',
    values: ['vertical', 'horizonal']
  },
  trigger: {
    type: definePropType<TooltipTriggerType>([String, Array]),
    values: ['hover', 'focus', 'click', 'contextmenu'],
    default: 'hover'
  },
  defaultOpened: String,
  popperOffset: Number,
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object])
  },
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object])
  }
} as const

export const subMenuProps = {
  index: {
    type: String,
    required: true
  }
} as const

export const menuItemProps = {
  index: {
    type: definePropType<string>([String]),
    required: true
  }
} as const

export type ExtistMenuItem = {
  index: string,
  active: ComputedRef<boolean>
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuInstance = InstanceType<typeof Menu>
