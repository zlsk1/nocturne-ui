<template>
  <div
    ref="referenceRef"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, watch, computed, onBeforeUnmount } from 'vue'
import { popperReferenceProps } from './reference'
import { POPPER_INJECTION_KEY } from './constants'
import { isElement } from '@/utils'
import { unrefElement } from '@vueuse/core'

import type { WatchStopHandle } from 'vue'

defineOptions({
  name: 'FrPopperReference'
})

const props = defineProps(popperReferenceProps)

const { referenceRef, role } = inject(POPPER_INJECTION_KEY, undefined)!

const ariaControls = computed<string | undefined>(() => {
  return ariaHaspopup.value ? props.id : undefined
})

const ariaDescribedby = computed<string | undefined>(() => {
  if (role && role.value === 'tooltip') {
    return props.open && props.id ? props.id : undefined
  }
  return undefined
})

const ariaHaspopup = computed<string | undefined>(() => {
  if (role && role.value !== 'tooltip') {
    return role.value
  }
  return undefined
})

const ariaExpanded = computed<string | undefined>(() => {
  return ariaHaspopup.value ? `${props.open}` : undefined
})

let virtualTriggerAriaStopWatch: WatchStopHandle | undefined

onMounted(() => {
  watch(
    () => props.virtualRef,
    (virtualEl) => {
      if (virtualEl) {
        referenceRef.value = unrefElement(virtualEl as HTMLElement)
      }
    },
    {
      immediate: true
    }
  )

  watch(
    referenceRef,
    (el, prevEl) => {
      virtualTriggerAriaStopWatch?.()
      virtualTriggerAriaStopWatch = undefined
      if (isElement(el)) {
        const children = el.children
        const parent = el.parentElement
        parent?.appendChild(children[0])
        parent?.removeChild(el);
        (
          [
            'onMouseenter',
            'onMouseleave',
            'onClick',
            'onKeydown',
            'onFocus',
            'onBlur',
            'onContextmenu'
          ] as const
        ).forEach((eventName) => {
          const handler = props[eventName]
          if (handler) {
            (el as HTMLElement).addEventListener(
              eventName.slice(2).toLowerCase(),
              handler
            );
            (prevEl as HTMLElement)?.removeEventListener?.(
              eventName.slice(2).toLowerCase(),
              handler
            )
          }
        })
        virtualTriggerAriaStopWatch = watch(
          [ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded],
          (watches) => {
            [
              'aria-controls',
              'aria-describedby',
              'aria-haspopup',
              'aria-expanded'
            ].forEach((key, idx) => {
              !watches[idx]
                ? el.removeAttribute(key)
                : el.setAttribute(key, watches[idx] as string)
            })
          },
          { immediate: true }
        )
      }
      if (isElement(prevEl)) {
        [
          'aria-controls',
          'aria-describedby',
          'aria-haspopup',
          'aria-expanded'
        ].forEach((key) => prevEl.removeAttribute(key))
      }
    },
    {
      immediate: true
    }
  )
})

onBeforeUnmount(() => {
  virtualTriggerAriaStopWatch?.()
  virtualTriggerAriaStopWatch = undefined
})

defineExpose({
  referenceRef
})
</script>
