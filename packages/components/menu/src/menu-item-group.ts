import { defineComponent, h, getCurrentInstance, inject } from 'vue'
import useMenu from './compoables/use-menu'
import { NSubMenuInjectionContext } from './constants'

export const menuItemGroupProps = {
  title: String
} as const

export default defineComponent({
  name: 'NMenuItemGroup',
  props: menuItemGroupProps,
  setup(props, { slots }) {
    const instance = getCurrentInstance()!
    const { parentMenu } = useMenu(instance)
    const subMenu = inject<NSubMenuInjectionContext>(`subMenu:${parentMenu.value.uid}`)
    if (!subMenu) {
      throw new Error('n-sub-menu, can not inject the sub-menu')
    }
    return () => h(
      'div',
      { class: ['n-menu__item__group'] },
      [
        h(
          'span',
          {
            class: [
              `level-${subMenu?.level}`
            ]
          },
          props.title
        ),
        slots.default?.()
      ]
    )
  }
})
