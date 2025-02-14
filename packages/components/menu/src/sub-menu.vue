<template>
  <li
    :class="[
      ns.m('container'),
      ns.is('hover', trigger === 'hover'),
      `level-${subMenu?.level}`
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
      :pure="true"
    >
      <div
        ref="subReferenceRef"
        :class="ns.m('reference')"
        @click="handleClick"
      >
        <slot name="title" />
        <Arrow
          v-if="!subMenu.level"
          size="16"
          :class="ns.e('item__arrow')"
          :style="{
            transform: opened ? 'rotate(-90deg)' : 'rotate(90deg)'
          }"
        />
        <Arrow
          v-else
          size="16"
          :class="ns.e('item__arrow')"
          :style="{
            transform: opened ? 'rotate(180deg)' : 'none'
          }"
        />
      </div>
      <template #content>
        <ul
          :class="ns.b()"
          @mouseenter="() => handleMouseEnter(100)"
          @mouseleave="() => handleMouseLeave(true)"
        >
          <slot name="default" />
        </ul>
      </template>
    </NTooltip>
    <div
      v-else
      :class="[
        ns.m('reference'),
        ns.is('hover', trigger === 'hover'),
        ns.is('collapse', collapse)
      ]"
      @click="handleClick"
    >
      <slot name="title" />
      <Arrow
        size="16"
        :class="ns.e('item__arrow')"
        :style="{
          transform: opened ? 'rotate(-90deg)' : 'rotate(90deg)'
        }"
      />
    </div>
    <NCollapseTransition v-if="!collapse">
      <ul
        v-show="opened"
        :class="ns.b()"
        @mouseenter="() => handleMouseEnter(100)"
        @mouseleave="() => handleMouseLeave(true)"
      >
        <slot name="default" />
      </ul>
    </NCollapseTransition>
  </li>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch
} from 'vue'
import { RiArrowRightWideFill as Arrow } from '@remixicon/vue'
import { useTimeoutFn } from '@vueuse/core'
import { useNamespace } from '@/composables'
import { NCollapseTransition, NTooltip } from '@/components'
import useMenu from './compoables/use-menu'
import { subMenuProps } from './menu'
import { NMENU_INJECTION_KEY } from './constants'
import type { ExtistMenuItem } from './menu'
import type { NSubMenuInjectionContext } from './constants'
import type { StyleValue } from 'vue'

defineOptions({
  name: 'NSubMenu'
})

const instance = getCurrentInstance()!
const { parentMenu } = useMenu(instance)

const ns = useNamespace('sub-menu')

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

const props = defineProps(subMenuProps)

let timeout: (() => void) | undefined

const subMenus = ref<Record<string, any>>({})
const mouseInChild = ref(false)

const opened = computed(() => rootMenu.openedMenus.value.includes(props.index))
const active = computed(() => {
  let isActive = false

  Object.values(subMenus.value).forEach((item) => {
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
  return (
    rootMenu.popperStyle?.value || {
      padding: '10px'
    }
  )
})
const popperClass = computed(() => rootMenu.popperClass?.value)
const isFirstLevel = computed(() => subMenu.level === 0)
const popoverPlacement = computed(() => {
  if (rootMenu.direction.value === 'horizonal' && isFirstLevel.value)
    return 'bottom'
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
  } else {
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
  if (
    (direction.value === 'horizonal' && trigger.value === 'click') ||
    (direction.value === 'vertical' && trigger.value === 'click')
  ) {
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
  if (
    (direction.value === 'horizonal' && trigger.value === 'click') ||
    (direction.value === 'vertical' && trigger.value === 'click')
  ) {
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
  if (
    rootMenu.direction.value === 'horizonal' &&
    rootMenu.trigger.value === 'hover'
  ) {
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
