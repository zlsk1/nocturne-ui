<template>
  <div
    ref="contentRef"
    :class="contentCls"
    v-bind="contentAttrs"
    :style="contentStyle"
    tabindex="-1"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  unref,
  watch
} from 'vue'
import { isElement } from '@/utils'
import { useNamespace } from '@/composables'
import { usePopperContent, usePopperContentDOM } from './composables'
import { popperContentProps } from './content'
import { POPPER_CONTENT_INJECTION_KEY } from './constants'
import type { WatchStopHandle } from 'vue'

defineOptions({
  name: 'NPopperContent'
})

const props = defineProps(popperContentProps)

const ns = useNamespace('popper')

const arrowOffset = ref()

const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } =
  usePopperContent(props)

const { ariaModal, arrowStyle, contentAttrs, contentClass, contentStyle } =
  usePopperContentDOM(props, {
    styles,
    attributes,
    role
  })

const updatePopper = (shouldUpdateZIndex = true) => {
  update()
  shouldUpdateZIndex
}

const contentCls = computed(() => [
  ns.b(),
  ns.is('pure', props.pure),
  contentClass.value
])

const togglePopperAlive = () => {
  updatePopper(false)
  // if (props.visible && props.focusOnShow) {
  //   trapped.value = true
  // } else if (props.visible === false) {
  //   trapped.value = false
  // }
}

let triggerTargetAriaStopWatch: WatchStopHandle | undefined

onMounted(() => {
  watch(
    () => props.triggerTargetEl,
    (triggerTargetEl, prevTriggerTargetEl) => {
      triggerTargetAriaStopWatch?.()
      triggerTargetAriaStopWatch = undefined

      const el = unref(triggerTargetEl || contentRef.value)
      const prevEl = unref(prevTriggerTargetEl || contentRef.value)

      if (isElement(el)) {
        triggerTargetAriaStopWatch = watch(
          [role, () => props.ariaLabel, ariaModal, () => props.id],
          (watches) => {
            ;['role', 'aria-label', 'aria-modal', 'id'].forEach((key, idx) => {
              !watches[idx]
                ? el.removeAttribute(key)
                : el.setAttribute(key, watches[idx] as string)
            })
          },
          { immediate: true }
        )
      }
      if (prevEl !== el && isElement(prevEl)) {
        ;['role', 'aria-label', 'aria-modal', 'id'].forEach((key) => {
          prevEl.removeAttribute(key)
        })
      }
    },
    { immediate: true }
  )

  watch(() => props.visible, togglePopperAlive, { immediate: true })
})

onBeforeUnmount(() => {
  triggerTargetAriaStopWatch?.()
  triggerTargetAriaStopWatch = undefined
})

provide(POPPER_CONTENT_INJECTION_KEY, {
  arrowStyle,
  arrowRef,
  arrowOffset
})

defineExpose({
  popperContentRef: contentRef,
  popperInstanceRef: instanceRef,
  updatePopper,
  contentStyle
})
</script>
