<template>
  <li :class="menuItemCls" @click="handleClick">
    <slot />
  </li>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { menuItemProps } from './menu'
import { NMENU_INJECTION_KEY } from './constants'
import useMenu from './compoables/use-menu'
import type { NSubMenuInjectionContext } from './constants'

defineOptions({
  name: 'NMenuItem'
})

const props = defineProps(menuItemProps)

const instance = getCurrentInstance()!
const { parentMenu } = useMenu(instance)

const ns = useNamespace('menu')

const rootMenu = inject(NMENU_INJECTION_KEY, undefined)!
if (!rootMenu) {
  throw new Error('n-sub-menu, can not inject the root-menu')
}
const subMenu = inject<NSubMenuInjectionContext>(
  `subMenu:${parentMenu.value.uid}`
)
if (!subMenu) {
  throw new Error('n-sub-menu, can not inject the sub-menu')
}

const active = computed(() => props.index === rootMenu.activeIndex.value)
const collapse = computed(() => rootMenu.collapse.value)
const menuItemCls = computed(() => [
  ns.e('item'),
  ns.is('active', active.value),
  ns.is('collapse', collapse.value),
  `level-${subMenu?.level}`
])

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
