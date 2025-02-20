import { withInstall } from '@nocturne-ui/utils'
import Menu from './src/menu'
import MenuItem from './src/menu-item.vue'
import SubMenu from './src/sub-menu.vue'
import MenuItemGroup from './src/menu-item-group'

export * from './src/props'
export * from './src/types'
export * from './src/menu-item-group'

export const NMenu = withInstall(Menu)
export const NMenuItem = withInstall(MenuItem)
export const NSubMenu = withInstall(SubMenu)
export const NMenuItemGroup = withInstall(MenuItemGroup)

export default NMenu
