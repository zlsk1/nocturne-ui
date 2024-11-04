<template>
  <li
    class="n-menu__item"
    :class="{'active' : active}"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts" setup>
import {
  inject,
  getCurrentInstance,
  onMounted,
  computed
} from 'vue'
import { menuItemProps } from './menu'
import { NMENU_INJECTION_KEY, NSubMenuInjectionContext } from './constants'
import useMenu from './compoables/use-menu'

defineOptions({
  name: 'NMenuItem'
})

const props = defineProps(menuItemProps)

const instance = getCurrentInstance()!
const { parentMenu } = useMenu(instance)

const rootMenu = inject(NMENU_INJECTION_KEY, undefined)!
if (!rootMenu) {
  throw new Error('n-sub-menu, can not inject the root-menu')
}
const subMenu = inject<NSubMenuInjectionContext>(`subMenu:${parentMenu.value.uid}`)
if (!subMenu) {
  throw new Error('n-sub-menu, can not inject the sub-menu')
}

const active = computed(() => props.index === rootMenu.activeIndex.value)

const handleClick = () => {
  rootMenu.handleMenuItemClick(props.index)
}

onMounted(() => {
  rootMenu.addSubMenu({
    index: props.index,
    active
  })
  subMenu.addSubMenu({
    index: props.index,
    active
  })
})
</script>
