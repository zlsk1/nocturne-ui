<template>
  <FrPopperReference
    :open="open"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @keydown="onKeydown"
  >
    <slot></slot>
  </FrPopperReference>
</template>

<script lang="ts" setup>
import { inject, ref, unref, toRef } from 'vue'
import { useTooltipTriggerProps } from './reference.js'
import { whenTrigger } from './utils'
import { composeEventHandlers } from '@/utils/dom'
import FrPopperReference from '@/components/popper/src/reference.vue'
import { TOOLTIP_INJECTION_KEY } from './constants'

defineOptions({
  name: 'FrTooltipReference'
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
    if (!e.button) {
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
  (e) => {
    const { code } = e
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
