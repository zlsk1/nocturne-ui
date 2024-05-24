<template>
  <div
    ref="referenceRef"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, onMounted, watch, computed, onBeforeUnmount } from 'vue'
import { popperReferenceProps } from './reference'

defineOptions({
  name: 'FrPopperReference'
})

const props = defineProps(popperReferenceProps)

const { referenceRef, role } = inject('popperProvide')

const ariaControls = computed(() => {
  return ariaHaspopup.value ? props.id : undefined
})

const ariaDescribedby = computed(() => {
  if (role && role.value === 'tooltip') {
    return props.open && props.id ? props.id : undefined
  }
  return undefined
})

const ariaHaspopup = computed(() => {
  if (role && role.value !== 'tooltip') {
    return role.value
  }
  return undefined
})

const ariaExpanded = computed(() => {
  return ariaHaspopup.value ? `${props.open}` : undefined
})

let virtualTriggerAriaStopWatch

onMounted(() => {
  watch(
    referenceRef,
    (el, prevEl) => {
      if (el) {
        (
          [
            'onMouseenter',
            'onMouseleave',
            'onClick'
          ]
        ).forEach((eventName) => {
          const handler = props[eventName]
          if (handler) {
            el.addEventListener(
              eventName.slice(2).toLowerCase(),
              handler
            )
            prevEl?.removeEventListener?.(
              eventName.slice(2).toLowerCase(),
              handler
            )
          }
        })
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
      if (el) {
        (
          [
            'onMouseenter',
            'onMouseleave',
            'onClick',
            'onKeydown',
            'onFocus',
            'onBlur',
            'onContextmenu'
          ]
        ).forEach((eventName) => {
          const handler = props[eventName]
          if (handler) {
            el.addEventListener(
              eventName.slice(2).toLowerCase(),
              handler
            )
            prevEl?.removeEventListener?.(
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
                : el.setAttribute(key, watches[idx])
            })
          },
          { immediate: true }
        )
      }
      if (prevEl) {
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
