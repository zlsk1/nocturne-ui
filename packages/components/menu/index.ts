import { withInstall } from '@/utils'
import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import SubMenu from './src/sub-menu.vue'

export const NMenu = withInstall(Menu)
export const NMenuItem = withInstall(MenuItem)
export const NSubMenu = withInstall(SubMenu)
