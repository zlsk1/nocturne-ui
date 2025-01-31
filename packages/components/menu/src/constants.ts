import type { InjectionKey, Ref, ToRefs } from 'vue'
import type { ExtistMenuItem, MenuProps } from './menu'

export type NMenuInjectionContext = {
  activeIndex: Ref<string | undefined>
  menuItems: Ref<any>
  subMenus: Ref<any>
  openedMenus: Ref<string[]>
  addSubMenu: (item: ExtistMenuItem) => void
  removeSubMenu: (item: ExtistMenuItem) => void
  openMenu: (index: string) => void
  closeMenu: (index: string) => void
  handleSubMenuClick: (index: string) => void
  handleMenuItemClick: (items: ExtistMenuItem) => void
} & ToRefs<
  Pick<
    MenuProps,
    | 'defaultOpened'
    | 'trigger'
    | 'direction'
    | 'popperOffset'
    | 'popperClass'
    | 'popperStyle'
    | 'path'
    | 'collapse'
  >
>

export type NSubMenuInjectionContext =
  | {
      addSubMenu: (item: ExtistMenuItem) => void
      removeSubMenu: (item: ExtistMenuItem) => void
      handleMouseLeave?: (deepDispatch: boolean) => void
      level: number
      mouseInChild: Ref<boolean>
    }
  | undefined

export const NMENU_INJECTION_KEY: InjectionKey<NMenuInjectionContext> =
  Symbol('NMenu')
