<template>
  <NPopperReference
    :open="open"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @keydown="onKeydown"
  >
    <slot />
  </NPopperReference>
</template>

<script lang="ts" setup>
import { inject, ref, toRef, unref } from 'vue'
import { composeEventHandlers } from '@/utils/dom'
import NPopperReference from '@/components/popper/src/reference.vue'
import { useTooltipTriggerProps } from './reference.js'
import { whenTrigger } from './utils'
import { TOOLTIP_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NTooltipReference'
})

const props = defineProps(useTooltipTriggerProps)

const { controlled, open, onOpen, onClose, onToggle } = inject(
  TOOLTIP_INJECTION_KEY,
  undefined
)!

const triggerRef = ref<HTMLElement | null>(null)

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
    // if (!e.button) {
    //   onToggle(e)
    // }
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
