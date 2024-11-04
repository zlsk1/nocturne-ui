<template>
  <NPopper ref="popperRef" :role="role">
    <NTooltipReference
      :trigger="trigger"
      :disabled="disabled"
      :trigger-keys="triggerKeys"
      :virtual-ref="virtualRef"
      :virtual-triggering="virtualTriggering"
    >
      <slot></slot>
    </NTooltipReference>
    <NTooltipContent
      ref="contentRef"
      :aria-label="ariaLabel"
      :boundaries-padding="boundariesPadding"
      :content="content"
      :disabled="disabled"
      :effect="effect"
      :enterable="enterable"
      :fallback-placements="fallbackPlacements"
      :hide-after="hideAfter"
      :gpu-acceleration="gpuAcceleration"
      :offset="offset"
      :persistent="persistent"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :placement="placement"
      :popper-options="popperOptions"
      :pure="pure"
      :raw-content="rawContent"
      :reference-el="referenceEl"
      :trigger-target-el="triggerTargetEl"
      :show-after="showAfter"
      :strategy="strategy"
      :teleported="teleported"
      :transition="transition"
      :virtual-triggering="virtualTriggering"
      :z-index="zIndex"
      :append-to="appendTo"
    >
      <slot name="content">
        <span v-if="rawContent" v-html="content"></span>
        <span v-else>{{ content }}</span>
      </slot>
      <NPopperArrow v-if="showArrow" :arrow-offset="arrowOffset"></NPopperArrow>
    </NTooltipContent>
  </NPopper>
</template>

<script lang="ts" setup>
import { ref, provide, computed, unref, toRef, watch, onDeactivated } from 'vue'
import { tooltipEmits, useTooltipModelToggle, useTooltipProps } from './tooltip'
import { useDelayedToggle } from '@/composables'
import NTooltipContent from './content.vue'
import NTooltipReference from './reference.vue'
import NPopper from '@/components/popper'
import NPopperArrow from '@/components/popper/src/arrow.vue'
import { TOOLTIP_INJECTION_KEY } from './constants'
import { isBoolean } from '@/utils'
import type { PopperInstance } from '@/components/popper'

defineOptions({
  name: 'NTooltip'
})

const props = defineProps(useTooltipProps)
const emit = defineEmits(tooltipEmits)

const popperRef = ref<PopperInstance>()
const contentRef = ref<any>()
const open = ref(false)
const toggleReason = ref<Event>()

const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
  indicator: open,
  toggleReason
})

const controlled = computed(() => isBoolean(props.visible) && !hasUpdateHandler.value)

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && open.value) {
      open.value = false
    }
  }
)

const { onOpen, onClose } = useDelayedToggle({
  showAfter: toRef(props, 'showAfter'),
  hideAfter: toRef(props, 'hideAfter'),
  autoClose: toRef(props, 'autoClose'),
  open: show,
  close: hide
})

onDeactivated(() => open.value && hide())

const updatePopper = () => {
  const popperComponent = unref(popperRef)
  if (popperComponent) {
    popperComponent.instancePopperRef?.update()
  }
}

const isFocusInsideContent = (event?: FocusEvent) => {
  const popperContent = contentRef.value?.contentRef?.popperContentRef
  const activeElement = (event?.relatedTarget) || document.activeElement

  return popperContent && popperContent.contains(activeElement)
}

provide(TOOLTIP_INJECTION_KEY, {
  controlled,
  open,
  trigger: toRef(props, 'trigger'),
  onOpen: (event?: Event) => {
    onOpen(event)
  },
  onClose: (event?: Event) => {
    onClose(event)
  },
  onToggle: (event?: Event) => {
    if (unref(open)) {
      onClose(event)
    }
    else {
      onOpen(event)
    }
  },
  onShow: () => {
    emit('show', toggleReason.value)
  },
  onHide: () => {
    emit('hide', toggleReason.value)
  },
  onBeforeShow: () => {
    emit('before-show', toggleReason.value)
  },
  onBeforeHide: () => {
    emit('before-hide', toggleReason.value)
  },
  updatePopper
})

defineExpose({
  popperRef,
  contentRef,
  isFocusInsideContent,
  updatePopper,
  onOpen,
  onClose,
  hide
})
</script>
