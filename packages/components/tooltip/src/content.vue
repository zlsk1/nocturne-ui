<template>
  <teleport :disabled="!teleported" :to="appendTo">
    <transition
      :name="transitionClass"
      @after-leave="onTransitionLeave"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterShow"
      @before-leave="onBeforeLeave"
    >
      <frPopperContent
        v-if="shouldRender"
        v-show="shouldShow"
        :id="id"
        ref="contentRef"
        v-bind="$attrs"
        :aria-label="ariaLabel"
        :aria-hidden="ariaHidden"
        :boundaries-padding="boundariesPadding"
        :fallback-placements="fallbackPlacements"
        :gpu-acceleration="gpuAcceleration"
        :offset="offset"
        :placement="placement"
        :popper-options="popperOptions"
        :strategy="strategy"
        :effect="effect"
        :enterable="enterable"
        :pure="pure"
        :popper-class="popperClass"
        :popper-style="[popperStyle, contentStyle]"
        :reference-el="referenceEl"
        :trigger-target-el="triggerTargetEl"
        :visible="shouldShow"
        :z-index="zIndex"
        :class="[
          effect === 'dark' ? 'is-dark' : 'is-light'
        ]"
        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
        @blur="onBlur"
        @close="onClose"
      >
        <template v-if="!destroyed">
          <slot></slot>
        </template>
      </frPopperContent>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { inject, computed, ref, onBeforeUnmount, unref, watch } from 'vue'
import { useTooltipContentProps } from './content'
import { onClickOutside } from '@vueuse/core'
import frPopperContent from '@/components/popper/src/content.vue'
import { composeEventHandlers } from '@/utils/dom'
import { TOOLTIP_INJECTION_KEY } from './constants'

defineOptions({
  name: 'FrTooltipContent'
})

const props = defineProps(useTooltipContentProps)

const {
  controlled,
  open,
  trigger,
  onClose,
  onOpen,
  onShow,
  onHide,
  onBeforeShow,
  onBeforeHide
} = inject(TOOLTIP_INJECTION_KEY, undefined)!

const contentRef = ref()
const destroyed = ref(false)

const transitionClass = computed(() => {
  return props.transition || 'fr-popper-transition'
})

const persistentRef = computed(() => {
  if (process.env.NODE_ENV === 'test') {
    return true
  }
  return props.persistent
})

onBeforeUnmount(() => {
  destroyed.value = true
})

const shouldRender = computed(() => {
  return unref(persistentRef) ? true : unref(open)
})

const shouldShow = computed(() => {
  return props.disabled ? false : unref(open)
})

const appendTo = computed(() => {
  return props.appendTo
})

const contentStyle = computed(() => props.style ?? {})

const ariaHidden = computed(() => !unref(open))

const onTransitionLeave = () => {
  onHide()
}

const stopWhenControlled = () => {
  if (unref(controlled)) return true
}

const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
  if (props.enterable && unref(trigger) === 'hover') {
    onOpen()
  }
})

const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
  if (unref(trigger) === 'hover') {
    onClose()
  }
})

const onBeforeEnter = () => {
  contentRef.value?.updatePopper?.()
  onBeforeShow?.()
}

const onBeforeLeave = () => {
  onBeforeHide?.()
}

const onAfterShow = () => {
  onShow()
  stopHandle = onClickOutside(
    computed(() => {
      return contentRef.value?.popperContentRef
    }),
    () => {
      if (unref(controlled)) return
      const $trigger = unref(trigger)
      if ($trigger !== 'hover') {
        onClose()
      }
    }
  )
}

const onBlur = () => {
  if (!props.virtualTriggering) {
    onClose()
  }
}

let stopHandle: ReturnType<typeof onClickOutside>

watch(
  () => unref(open),
  (val) => {
    if (!val) {
      stopHandle?.()
    }
  },
  {
    flush: 'post'
  }
)

watch(
  () => props.content,
  () => {
    contentRef.value?.updatePopper?.()
  }
)

defineExpose({
  contentRef
})
</script>

<style>
@import '@/theme-chalk/popper.scss';
</style>
