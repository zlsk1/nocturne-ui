import type { InjectionKey, Ref, ToRefs } from 'vue'
import type { MenuProps, ExtistMenuItem } from './menu'

export type NMenuInjectionContext = {
  activeIndex: Ref<string | undefined>,
  menuItems: Ref<any>,
  subMenus: Ref<any>,
  openedMenus: Ref<string[]>,
  addSubMenu: (item: ExtistMenuItem) => void,
  removeSubMenu: (item: ExtistMenuItem) => void,
  openMenu: (index: string) => void,
  closeMenu: (index: string) => void,
  handleSubMenuClick: (index: string) => void,
  handleMenuItemClick: (index: string) => void
} & ToRefs<
  Pick<
    MenuProps,
    'trigger' | 'direction' | 'popperOffset' | 'popperClass' | 'popperStyle'
  >
>

export type NSubMenuInjectionContext = {
  addSubMenu: (item: ExtistMenuItem) => void,
  removeSubMenu: (item: ExtistMenuItem) => void,
  handleMouseLeave?:(deepDispatch: boolean) => void,
  level: number,
  mouseInChild: Ref<boolean>
} | undefined

export const NMENU_INJECTION_KEY: InjectionKey<NMenuInjectionContext> = Symbol('NMenu')
