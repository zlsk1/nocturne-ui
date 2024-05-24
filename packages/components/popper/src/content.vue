<template>
  <div
    ref="contentRef"
    class="fr-popper"
    v-bind="contentAttrs"
    :style="contentStyle"
    :class="contentClass"
    tabindex="-1"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { provide, ref, watch, onMounted, unref, onBeforeUnmount } from 'vue'
import { usePopperContentDOM, usePopperContent } from './compoables'
import { popperCoreConfigProps } from './content'

defineOptions({
  name: 'FrPopperContent'
})

const props = defineProps(popperCoreConfigProps)

const arrowOffset = ref()

const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = usePopperContent(props)

const {
  ariaModal,
  arrowStyle,
  contentAttrs,
  contentClass,
  contentStyle,
  updateZIndex
} = usePopperContentDOM(props, {
  styles,
  attributes,
  role
})

const updatePopper = (shouldUpdateZIndex = true) => {
  update()
  shouldUpdateZIndex && updateZIndex()
}

const togglePopperAlive = () => {
  updatePopper(false)
  // if (props.visible && props.focusOnShow) {
  //   trapped.value = true
  // } else if (props.visible === false) {
  //   trapped.value = false
  // }
}

let triggerTargetAriaStopWatch

onMounted(() => {
  watch(
    () => props.triggerTargetEl,
    (triggerTargetEl, prevTriggerTargetEl) => {
      triggerTargetAriaStopWatch?.()
      triggerTargetAriaStopWatch = undefined

      const el = unref(triggerTargetEl || contentRef.value)
      const prevEl = unref(prevTriggerTargetEl || contentRef.value)

      if (el) {
        triggerTargetAriaStopWatch = watch(
          [role, () => props.ariaLabel, ariaModal, () => props.id],
          (watches) => {
            ['role', 'aria-label', 'aria-modal', 'id'].forEach((key, idx) => {
              !watches[idx]
                ? el.removeAttribute(key)
                : el.setAttribute(key, watches[idx])
            })
          },
          { immediate: true }
        )
      }
      if (prevEl !== el && prevEl) {
        ['role', 'aria-label', 'aria-modal', 'id'].forEach((key) => {
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

provide('popperContentProvide', {
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
