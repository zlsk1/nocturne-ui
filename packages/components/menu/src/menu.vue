<template>
  <div :class="[ns.b()]">
    <ul :class="[ns.m('direction')]">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, toRefs, getCurrentInstance } from 'vue'
import { menuProps, menuEmit } from './menu'
import { NMENU_INJECTION_KEY, NMenuInjectionContext, NSubMenuInjectionContext } from './constants'
import { useNamespace } from '@/composables'

import type { ExtistMenuItem } from './menu'
import { isNil } from 'lodash'

defineOptions({
  name: 'NMenu'
})

const props = defineProps(menuProps)
const emit = defineEmits(menuEmit)

const ns = useNamespace('menu')

const instance = getCurrentInstance()!

const activeIndex = ref<string>(props.defaultOpened || '')
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
  emit('open', openedMenus.value)
}

const closeMenu = (index: string) => {
  const target = openedMenus.value.indexOf(index)
  if (target > -1) {
    openedMenus.value.splice(target, 1)
    emit('close', openedMenus.value)
  }
}

const handleSubMenuClick = (index: string) => {
  const opened = openedMenus.value.includes(index)

  if (opened) closeMenu(index)
  else openMenu(index)
}

const handleMenuItemClick = (items: ExtistMenuItem) => {
  if (props.direction === 'horizonal') {
    openedMenus.value = []
  }
  const { index, path } = items

  if (isNil(index)) return

  activeIndex.value = index

  emit('select', index, path)
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
