<template>
  <n-popper-trigger
    :id="id"
    :virtual-ref="virtualRef"
    :open="open"
    :virtual-triggering="virtualTriggering"
    :class="ns.e('trigger')"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @keydown="onKeydown"
  >
    <slot />
  </n-popper-trigger>
</template>

<script lang="ts" setup>
import { inject, ref, toRef, unref } from 'vue'
import { composeEventHandlers } from '@nocturne-ui/utils/dom'
import NPopperTrigger from '@nocturne-ui/components/popper/src/trigger.vue'
import { useNamespace } from '@nocturne-ui/composables'
import { useTooltipTriggerProps } from './trigger.js'
import { whenTrigger } from './utils'
import { TOOLTIP_INJECTION_KEY } from './constants'
import type { OnlyChildExpose } from '@nocturne-ui/components/slot'

defineOptions({
  name: 'NTooltiptrigger'
})

const props = defineProps(useTooltipTriggerProps)

const { controlled, open, onOpen, onClose, onToggle } = inject(
  TOOLTIP_INJECTION_KEY,
  undefined
)!

const ns = useNamespace('tooltip')

const triggerRef = ref<OnlyChildExpose | null>(null)

const stopWhenControlledOrDisabled = () => {
  if (unref(controlled) || props.disabled) {
    return true
  }
}

const trigger = toRef(props, 'trigger')

const onMouseenter = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'hover', onOpen)
)

const onMouseleave = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'hover', onClose)
)

const onClick = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'click', (e) => {
    onToggle(e)
    // distinguish left click
    if ((e as MouseEvent).button === 0) {
      onToggle(e)
    }
  })
)

const onFocus = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'focus', onOpen)
)

const onBlur = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'focus', onClose)
)

const onContextMenu = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'contextmenu', (e) => {
    e.preventDefault()
    onToggle(e)
  })
)

const onKeydown = composeEventHandlers(
  stopWhenControlledOrDisabled,
  (e: Event) => {
    const { code } = e as KeyboardEvent
    if (props.triggerKeys.includes(code)) {
      e.preventDefault()
      onToggle(e)
    }
  }
)

defineExpose({
  triggerRef
})
</script>
