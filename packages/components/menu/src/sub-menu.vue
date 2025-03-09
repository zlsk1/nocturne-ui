<template>
  <li
    :class="subMenuCls"
    role="none"
    @mouseenter="() => handleMouseEnter()"
    @mouseleave="() => handleMouseLeave()"
  >
    <n-tooltip
      ref="tooltipRef"
      :visible="opened"
      :show-arrow="false"
      :trigger="trigger"
      :popper-style="{
        padding: '0 2px'
      }"
      :popper-class="[ns.m('popper'), rootMenu.popperClass!]"
      :placement="popoverPlacement"
      :teleported="appendToBody"
      :offset="popperOffset ?? rootMenu.popperOffset"
      :disabled="disabled || !shouldShowTooltip"
      persistent
      :gpu-acceleration="false"
      pure
      :fallback-placements="fallbackPlacements"
      :transition="`${ns.ns.value}-zoom-in-top`"
    >
      <div
        aria-haspopup="true"
        :aria-expanded="opened"
        :aria-disabled="disabled"
        tabindex="-1"
        :class="[ns.m('title'), ns.is('selected', selected && !disabled)]"
        :style="{
          paddingLeft:
            !inTooltip && subMenu?.level ? `${subMenu?.level * 24}px` : '',
          padding:
            !inTooltip && rootMenu.collapse
              ? `0 calc((72px - ${iconWidth}px) / 2)`
              : ''
        }"
        @click="handleClick"
      >
        <span v-if="$slots.icon" ref="iconRef" :class="ns.m('title-icon')">
          <slot name="icon" />
        </span>
        <span v-if="$slots.title" :class="ns.m('title-label')">
          <slot name="title" />
        </span>
        <n-icon
          v-if="rootMenu.direction === 'vertical'"
          :size="iconSize"
          :class="ns.e('arrow')"
        >
          <Arrow
            :style="{
              transform: opened ? 'rotate(-90deg)' : 'rotate(90deg)'
            }"
          />
        </n-icon>
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
    </n-tooltip>
    <n-collapse-transition
      v-if="!rootMenu.collapse && rootMenu.direction === 'vertical'"
    >
      <ul
        v-show="opened"
        :class="ns.b()"
        @mouseenter="() => handleMouseEnter(100)"
        @mouseleave="() => handleMouseLeave(true)"
      >
        <slot name="default" />
      </ul>
    </n-collapse-transition>
  </li>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  watch
} from 'vue'
import { RiArrowRightSLine as Arrow } from '@remixicon/vue'
import { useTimeoutFn } from '@vueuse/core'
import { useNamespace } from '@nocturne-ui/composables'
import NCollapseTransition from '@nocturne-ui/components/collapse-transition'
import NTooltip from '@nocturne-ui/components/tooltip'
import NIcon from '@nocturne-ui/components/icon'
import useMenu from './compoables/use-menu'
import { subMenuProps } from './props'
import { NMENU_INJECTION_KEY } from './constants'
import type { NMenuInjectionContext, NSubMenuInjectionContext } from './types'
import type { TooltipInstance } from '@nocturne-ui/components/tooltip'
import type { Placement } from '@popperjs/core'

defineOptions({
  name: 'NSubMenu'
})

const props = defineProps(subMenuProps)

const instance = getCurrentInstance()!
const { parentMenu, indexPath } = useMenu(
  instance,
  computed(() => props.index)
)

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

let timeout: (() => void) | undefined

const subMenus = ref<NMenuInjectionContext['subMenus']>({})
const mouseInChild = ref(false)
const tooltipRef = ref<TooltipInstance>()
const iconRef = ref<HTMLSpanElement>()
const iconWidth = ref(18)

const opened = computed(() => rootMenu.openedMenus.includes(props.index))
const selected = computed(() => {
  return Object.values(subMenus.value).some((item) => item.selected)
})
const trigger = computed(() => {
  if (rootMenu.collapse) return 'hover'
  return rootMenu.trigger
})
const isFirstLevel = computed(() => subMenu.level === 0)
const popoverPlacement = computed(() => {
  if (rootMenu.direction === 'horizontal' && isFirstLevel.value) return 'bottom'
  return 'right-start'
})
const appendToBody = computed(() => {
  return isFirstLevel.value
})
const iconSize = computed(() =>
  rootMenu.collapse && rootMenu.direction === 'vertical' && !inTooltip.value
    ? '24'
    : '18'
)
const fallbackPlacements = computed<Placement[]>(() =>
  rootMenu.direction === 'horizontal' && isFirstLevel.value
    ? [
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
        'right-start',
        'left-start'
      ]
    : [
        'right-start',
        'right',
        'right-end',
        'left-start',
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end'
      ]
)
const shouldShowTooltip = computed(
  () =>
    rootMenu.direction === 'horizontal' ||
    (rootMenu.direction === 'vertical' && rootMenu.collapse)
)
const inTooltip = computed(() => {
  if (rootMenu.direction === 'horizontal') return true

  return (
    parentMenu.value.type.name === 'NSubMenu' &&
    rootMenu.direction === 'vertical' &&
    rootMenu.collapse
  )
})
const subMenuCls = computed(() => [
  ns.m('container'),
  ns.is('hover', trigger.value === 'hover'),
  ns.is('disabled', props.disabled)
])
const state = reactive({
  index: props.index,
  selected,
  indexPath,
  level: subMenu.level
})

const addSubMenu: NMenuInjectionContext['addSubMenu'] = (item) => {
  subMenus.value[item.index] = item
}

const removeSubMenu: NMenuInjectionContext['removeSubMenu'] = (item) => {
  delete subMenus.value[item.index]
}

const handleMouseEnter = (delay = rootMenu.openDelay) => {
  if (props.disabled || trigger.value === 'click') {
    subMenu.mouseInChild.value = true
    return
  }

  subMenu.mouseInChild.value = true

  timeout?.()
  ;({ stop: timeout } = useTimeoutFn(() => {
    rootMenu.openMenu(props.index, indexPath.value)
  }, delay))
}

const handleMouseLeave = (
  deepDispatch = false,
  delay = rootMenu.closeDelay
) => {
  if (props.disabled || trigger.value === 'click') {
    subMenu.mouseInChild.value = false
    return
  }

  subMenu.mouseInChild.value = false

  timeout?.()
  ;({ stop: timeout } = useTimeoutFn(() => {
    !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value)
  }, delay))

  if (appendToBody.value && deepDispatch) {
    subMenu.handleMouseLeave?.(true)
  }
}

const handleClick = () => {
  if (
    props.disabled ||
    (rootMenu.direction === 'horizontal' && rootMenu.trigger === 'hover')
  ) {
    return
  }
  rootMenu.handleSubMenuClick(props.index, indexPath.value)
}

const updatePopper = () => {
  tooltipRef.value?.popperRef?.instancePopperRef?.update()
}

watch(
  () => rootMenu.collapse,
  async () => {
    await nextTick()
    updatePopper()

    if (iconRef.value) {
      iconWidth.value = iconRef.value.getBoundingClientRect().width || 18
    }
  }
)

provide<NSubMenuInjectionContext>(`subMenu:${instance.uid}`, {
  addSubMenu,
  removeSubMenu,
  handleMouseLeave,
  level: subMenu.level + 1,
  mouseInChild
})

onMounted(() => {
  rootMenu.addSubMenu(state)
  subMenu.addSubMenu(state)
})

onBeforeUnmount(() => {
  rootMenu.removeSubMenu(state)
  subMenu.addSubMenu(state)
})
</script>
