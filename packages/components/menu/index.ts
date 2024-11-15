import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import SubMenu from './src/sub-menu.vue'
import MenuItemGroup from './src/menu-item-group'
import { withInstall } from '@/utils'

export const NMenu = withInstall(Menu)
export const NMenuItem = withInstall(MenuItem)
export const NSubMenu = withInstall(SubMenu)
export const NMenuItemGroup = withInstall(MenuItemGroup)
