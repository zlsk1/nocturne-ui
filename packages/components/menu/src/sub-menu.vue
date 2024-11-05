<template>
  <li
    :class="[
      'n-sub-menu--container',
      `level-${subMenu?.level}`,
      {'is-hover': trigger === 'hover'}
    ]"
    @mouseenter="() => handleMouseEnter()"
    @mouseleave="() => handleMouseLeave()"
  >
    <NTooltip
      v-if="direction === 'horizonal' || (direction === 'vertical' && collapse)"
      :visible="opened"
      :show-arrow="false"
      :trigger="trigger"
      :popper-style="popperStyle"
      :popper-class="popperClass"
      :placement="popoverPlacement"
      :teleported="appendToBody"
      :offset="15"
      :persistent="true"
      :gpu-acceleration="false"
    >
      <div
        ref="subReferenceRef"
        class="n-sub-reference"
        @click="handleClick"
      >
        <slot name="title"></slot>
        <Arrow
          v-if="!subMenu.level"
          size="16"
          class="n-menu__item__arrow"
          :style="{
            transform: opened ? 'rotate(-90deg)' : 'rotate(90deg)'
          }"
        ></Arrow>
        <Arrow
          v-else
          size="16"
          class="n-menu__item__arrow"
          :style="{
            transform: opened ? 'rotate(180deg)' : 'none'
          }"
        ></Arrow>
      </div>
      <template #content>
        <ul
          class="n-sub-menu"
          @mouseenter="() => handleMouseEnter(100)"
          @mouseleave="() => handleMouseLeave(true)"
        >
          <slot name="default"></slot>
        </ul>
      </template>
    </NTooltip>
    <div
      v-else
      :class="[
        'n-sub-reference',
        {'is-hover': trigger === 'hover'},
        collapse && 'is-collapse'
      ]"
      @click="handleClick"
    >
      <slot name="title"></slot>
      <Arrow
        size="16"
        class="n-menu__item__arrow"
        :style="{
          transform: opened ? 'rotate(-90deg)' : 'rotate(90deg)'
        }"
      ></Arrow>
    </div>
    <NCollapseTransition v-if="!collapse">
      <ul
        v-show="opened"
        class="n-sub-menu"
        @mouseenter="() => handleMouseEnter(100)"
        @mouseleave="() => handleMouseLeave(true)"
      >
        <slot name="default"></slot>
      </ul>
    </NCollapseTransition>
  </li>
</template>

<script lang="ts" setup>
import {
  ref,
  inject,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  computed,
  provide,
  watch
} from 'vue'
import { NTooltip, NCollapseTransition } from '@/components'
import useMenu from './compoables/use-menu'
import { subMenuProps, ExtistMenuItem } from './menu'
import {
  RiArrowRightWideFill as Arrow
} from '@remixicon/vue'
import { NMENU_INJECTION_KEY, NSubMenuInjectionContext } from './constants'
import { useTimeoutFn } from '@vueuse/core'

import type { StyleValue } from 'vue'

defineOptions({
  name: 'NSubMenu'
})

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

const props = defineProps(subMenuProps)

let timeout: (() => void) | undefined

const subMenus = ref<Record<string, any>>({})
const mouseInChild = ref(false)

const opened = computed(() => rootMenu.openedMenus.value.includes(props.index))
const active = computed(() => {
  let isActive = false

  Object.values(subMenus.value).forEach(item => {
    if (item.active) {
      isActive = true
    }
  })

  return isActive
})
const trigger = computed(() => {
  if (collapse.value) return 'hover'
  return rootMenu.trigger.value
})
const direction = computed(() => rootMenu.direction.value)
const popperStyle = computed<StyleValue>(() => {
  return rootMenu.popperStyle?.value || {
    padding: '10px'
  }
})
const popperClass = computed(() => rootMenu.popperClass?.value)
const isFirstLevel = computed(() => subMenu.level === 0)
const popoverPlacement = computed(() => {
  if (rootMenu.direction.value === 'horizonal' && isFirstLevel.value) return 'bottom'
  return 'right-start'
})
const appendToBody = computed(() => {
  return isFirstLevel.value
})
const collapse = computed(() => rootMenu.collapse.value)
const data = ref({
  index: props.index,
  path: rootMenu.path?.value,
  active
})

watch(collapse, (val) => {
  if (val) {
    rootMenu.closeMenu(props.index)
  }
  else {
    rootMenu.openMenu(props.index)
  }
})

const addSubMenu = (item: ExtistMenuItem) => {
  subMenus.value[item.index] = item
}

const removeSubMenu = (item: ExtistMenuItem) => {
  delete subMenus.value[item.index]
}

const handleMouseEnter = (delay = 300) => {
  if (direction.value === 'horizonal' && trigger.value === 'click' || direction.value === 'vertical' && trigger.value === 'click') {
    subMenu.mouseInChild.value = true
    return
  }

  subMenu.mouseInChild.value = true

  timeout?.()
  ;({ stop: timeout } = useTimeoutFn(() => {
    rootMenu.openMenu(props.index)
  }, delay))
}

const handleMouseLeave = (deepDispatch = false) => {
  if (direction.value === 'horizonal' && trigger.value === 'click' || direction.value === 'vertical' && trigger.value === 'click') {
    subMenu.mouseInChild.value = false
    return
  }

  timeout?.()

  subMenu.mouseInChild.value = false

  ;({ stop: timeout } = useTimeoutFn(() => {
    !mouseInChild.value && rootMenu.closeMenu(props.index)
  }, 300))

  if (appendToBody.value && deepDispatch) {
    subMenu.handleMouseLeave?.(true)
  }
}

const handleClick = () => {
  if (rootMenu.direction.value === 'horizonal' && rootMenu.trigger.value === 'hover') {
    return
  }
  rootMenu.handleSubMenuClick(props.index)
}

provide<NSubMenuInjectionContext>(`subMenu:${instance.uid}`, {
  addSubMenu,
  removeSubMenu,
  handleMouseLeave,
  level: subMenu.level + 1,
  mouseInChild
})

onMounted(() => {
  rootMenu.addSubMenu(data.value)
  subMenu.addSubMenu(data.value)
})

onBeforeUnmount(() => {
  rootMenu.removeSubMenu(data.value)
  subMenu.addSubMenu(data.value)
})
</script>
