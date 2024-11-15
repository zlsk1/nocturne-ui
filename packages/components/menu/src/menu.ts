import Menu from './menu.vue'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { TooltipTriggerType } from '@/components/tooltip'
import type { ClassType } from '@/components/popper'
import { definePropType, isString } from '@/utils'

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
  },
  path: String,
  collapse: {
    type: Boolean,
    default: false
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
  index: string
  active: boolean
  path?: string
}

export const menuEmit = {
  select: (index: string, path?: string) =>
    isString(index) && (isString(path) || typeof path === 'undefined'),
  open: (openIndexs: string[]) => true,
  close: (openIndexs: string[]) => true
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type NMenuEmit = typeof menuEmit
export type MenuInstance = InstanceType<typeof Menu>
