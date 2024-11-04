<template>
  <div :class="['n-menu']">
    <ul :class="[`n-menu--${direction}`]">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, toRefs, getCurrentInstance } from 'vue'
import { menuProps } from './menu'
import { NMENU_INJECTION_KEY, NMenuInjectionContext, NSubMenuInjectionContext } from './constants'

import type { ExtistMenuItem } from './menu'
import { isNil } from 'lodash'

defineOptions({
  name: 'NMenu'
})

const props = defineProps(menuProps)

const instance = getCurrentInstance()!

const activeIndex = ref<string>()
const menuItems = ref<Record<string, any>>({})
const subMenus = ref<Record<string, any>>({})
const openedMenus: NMenuInjectionContext['openedMenus'] = ref([])
const mouseInChild = ref(false)

const addMenu = (item: ExtistMenuItem) => {
  menuItems.value[item.index] = item
}

const removeMenu = (item: ExtistMenuItem) => {
  delete menuItems.value[item.index]
}

const addSubMenu = (item: ExtistMenuItem) => {
  subMenus.value[item.index] = item
}

const removeSubMenu = (item: ExtistMenuItem) => {
  delete subMenus.value[item.index]
}

const openMenu = (index: string) => {
  if (openedMenus.value.includes(index)) return

  openedMenus.value.push(index)
}

const closeMenu = (index: string) => {
  const target = openedMenus.value.indexOf(index)
  if (target > -1) {
    openedMenus.value.splice(target, 1)
  }
}

const onClick = (index: string) => {
  const opened = openedMenus.value.includes(index)

  if (opened) closeMenu(index)
  else openMenu(index)
}

const handleSubMenuClick = (index: string) => {
  onClick(index)
}

const handleMenuItemClick = (index: string) => {
  if (props.direction === 'horizonal') {
    openedMenus.value = []
  }
  if (isNil(index)) return

  activeIndex.value = index
}

provide(NMENU_INJECTION_KEY, {
  ...toRefs(props),
  menuItems,
  subMenus,
  openedMenus,
  activeIndex,
  addSubMenu,
  removeSubMenu,
  openMenu,
  closeMenu,
  handleSubMenuClick,
  handleMenuItemClick
})
provide<NSubMenuInjectionContext>(`subMenu:${instance.uid}`, {
  addSubMenu,
  removeSubMenu,
  level: 0,
  mouseInChild
})
</script>
