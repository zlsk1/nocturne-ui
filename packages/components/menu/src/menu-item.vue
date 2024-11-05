<template>
  <li
    :class="[
      'n-menu__item',
      {'active' : active},
      `level-${subMenu?.level}`,
      collapse && 'is-collapse'
    ]"
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
  computed,
  ref
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
const collapse = computed(() => rootMenu.collapse.value)

const data = ref({
  index: props.index,
  path: rootMenu.path?.value,
  active
})

const handleClick = () => {
  rootMenu.handleMenuItemClick(data.value)
}

onMounted(() => {
  rootMenu.addSubMenu(data.value)
  subMenu.addSubMenu(data.value)
})
</script>
