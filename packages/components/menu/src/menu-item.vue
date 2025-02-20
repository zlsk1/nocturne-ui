<template>
  <li
    :class="menuItemCls"
    :aria-disabled="disabled"
    role="menuitem"
    tabindex="-1"
    @click="handleClick"
  >
    <n-tooltip
      placement="right"
      :offset="rootMenu.popperOffset"
      :disabled="disabled || !shouldShowTooltip"
      :popper-class="`${ns.ns.value}-sub-menu--popper`"
    >
      <template #content>
        <div
          :class="ns.m('title')"
          :style="{
            paddingLeft: `${subMenu?.level * 24}px`
          }"
        >
          <slot name="title" />
          <span
            v-if="!shouldShowTooltip && $slots.icon"
            ref="iconRef"
            :class="ns.m('title-icon')"
          >
            <slot name="icon" />
          </span>
        </div>
      </template>
      <div
        :class="ns.m('title')"
        :style="{
          paddingLeft:
            !inTooltip && subMenu?.level ? `${subMenu?.level * 24}px` : '',
          padding:
            rootMenu.collapse && !inTooltip
              ? `0 calc((72px - ${iconWidth}px) / 2)`
              : ''
        }"
      >
        <span v-if="$slots.icon" ref="iconRef" :class="ns.m('title-icon')">
          <slot name="icon" />
        </span>
        <span v-if="$slots.title" :class="ns.m('title-label')">
          <slot name="title" />
        </span>
      </div>
    </n-tooltip>
  </li>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import NTooltip from '@nocturne-ui/components/tooltip'
import { menuItemEmit, menuItemProps } from './props'
import { NMENU_INJECTION_KEY } from './constants'
import useMenu from './compoables/use-menu'
import type { NSubMenuInjectionContext } from './types'

defineOptions({
  name: 'NMenuItem'
})

const props = defineProps(menuItemProps)
const emit = defineEmits(menuItemEmit)

const instance = getCurrentInstance()!
const { parentMenu, indexPath } = useMenu(
  instance,
  computed(() => props.index)
)

const ns = useNamespace('menu-item')

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

const iconRef = ref<HTMLSpanElement>()
const iconWidth = ref(18)

const selected = computed(() => props.index === rootMenu.selectedIndex)
const menuItemCls = computed(() => [
  ns.b(),
  ns.is('selected', selected.value && !props.disabled),
  ns.is('disabled', props.disabled)
])
const inTooltip = computed(() => {
  if (rootMenu.direction === 'horizontal') return true

  return (
    parentMenu.value.type.name === 'NSubMenu' &&
    rootMenu.direction === 'vertical' &&
    rootMenu.collapse
  )
})
const shouldShowTooltip = computed(
  () => rootMenu.collapse && subMenu.level === 0
)
const state = reactive({
  index: props.index,
  selected,
  indexPath,
  level: subMenu.level
})

const handleClick = () => {
  if (props.disabled) return
  rootMenu.handleMenuItemClick(state)
  emit('click', props.index, indexPath.value)
}

watch(
  () => rootMenu.collapse,
  () => {
    if (iconRef.value) {
      iconWidth.value = iconRef.value.getBoundingClientRect().width
    }
  }
)

onMounted(() => {
  rootMenu.addSubMenu(state)
  subMenu.addSubMenu(state)
})

onBeforeUnmount(() => {
  rootMenu.removeSubMenu(state)
  subMenu.addSubMenu(state)
})
</script>
