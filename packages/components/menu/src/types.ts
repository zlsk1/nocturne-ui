import Menu from './menu'
import MenuItem from './menu-item.vue'
import SubMenu from './sub-menu.vue'
import {
  menuEmit,
  menuItemEmit,
  menuItemProps,
  menuProps,
  subMenuProps
} from './props'

import type { ExtractPropTypes, Ref } from 'vue'

export type MenuItemType = {
  index: string
  selected: boolean
  level: number
  indexPath: string[]
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type NMenuEmit = typeof menuEmit
export type MenuInstance = InstanceType<typeof Menu>

export type MenuItemInstance = InstanceType<typeof MenuItem>
export type NMenuItemEmit = typeof menuItemEmit
export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

export type SubMenuInstance = InstanceType<typeof SubMenu>
export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>

export type NMenuInjectionContext = {
  selectedIndex: string
  subMenus: Record<string, MenuItemType>
  openedMenus: string[]
  addSubMenu: (item: MenuItemType) => void
  removeSubMenu: (item: MenuItemType) => void
  openMenu: (index: string, indexPath: string[]) => void
  closeMenu: (index: string, indexPath: string[]) => void
  handleSubMenuClick: (index: string, indexPath: string[]) => void
  handleMenuItemClick: (item: MenuItemType) => void
} & MenuProps

export type NSubMenuInjectionContext = {
  addSubMenu: (item: MenuItemType) => void
  removeSubMenu: (item: MenuItemType) => void
  handleMouseLeave?: (deepDispatch: boolean) => void
  level: number
  mouseInChild: Ref<boolean>
}
