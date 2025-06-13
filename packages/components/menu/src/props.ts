import { definePropType, isArray, isString } from '@nocturne-ui/utils'

export const menuProps = {
  direction: {
    type: definePropType<'vertical' | 'horizontal'>(String),
    default: 'horizontal'
  },
  trigger: {
    type: definePropType<'click' | 'hover'>([String, Array]),
    default: 'hover'
  },
  defaultActive: String,
  defaultOpeneds: {
    type: definePropType<string[]>(Array)
  },
  popperOffset: {
    type: Number,
    default: 6
  },
  popperClass: {
    type: String
  },
  collapse: {
    type: Boolean,
    default: false
  },
  uniqueOpened: {
    type: Boolean,
    default: false
  },
  /**
   * @description hide menu items while there is insufficient horizontal space,
   * only works when direction is horizontal
   */
  ellipsis: {
    type: Boolean,
    default: true
  },
  /**
   * @description mouse leave delay before hiding submenu,
   * only works when trigger is hover
   */
  closeDelay: {
    type: Number,
    default: 150
  },
  /**
   * @description mouse enter delay before hiding submenu,
   * only works when trigger is hover
   */
  openDelay: {
    type: Number,
    default: 0
  }
} as const

export const subMenuProps = {
  index: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  popperOffset: Number
} as const

export const menuItemProps = {
  index: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export const checkPathString = (indexPath: string[]) =>
  isArray(indexPath) && indexPath.every((path) => isString(path))

export const menuEmit = {
  select: (index: string, indexPath: string[]) =>
    isString(index) && checkPathString(indexPath),
  open: (index: string, indexPath: string[]) =>
    isString(index) && checkPathString(indexPath),
  close: (index: string, indexPath: string[]) =>
    isString(index) && checkPathString(indexPath)
}

export const menuItemEmit = {
  click: (index: string, indexPath: string[]) =>
    isString(index) && checkPathString(indexPath)
}
