<template>
  <n-tooltip
    ref="tooltipRef"
    :content="content"
    :disabled="disabled"
    :effect="effect"
    :enterable="enterable"
    :fallback-placements="fallbackPlacements"
    :hide-after="hideAfter"
    :gpu-acceleration="gpuAcceleration"
    :offset="offset"
    :persistent="persistent"
    :popper-class="popoverClass"
    :popper-style="popoverStyle"
    :placement="placement"
    :popper-options="popperOptions"
    :raw-content="rawContent"
    :reference-el="referenceEl"
    :trigger="trigger"
    :trigger-target-el="triggerTargetEl"
    :show-after="showAfter"
    :strategy="strategy"
    :teleported="teleported"
    :transition="transition"
    :virtual-triggering="virtualTriggering"
    :z-index="zIndex"
    :append-to="appendTo"
    :show-arrow="showArrow"
    @before-show="beforeEnter"
    @before-hide="beforeLeave"
    @show="afterEnter"
    @hide="afterLeave"
    @update:visible="updateVisible"
  >
    <template v-if="$slots.reference">
      <slot name="reference"></slot>
    </template>
    <template #content>
      <div v-if="title" :class="ns.e('title')">{{ title }}</div>
      <slot>{{ content }}</slot>
    </template>
  </n-tooltip>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { popoverProps, popoverEmit } from './popover'
import { NTooltip, TooltipInstance } from '@/components'
import { isNumber } from '@/utils'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NPopover'
})

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmit)

const ns = useNamespace('popover')

const tooltipRef = ref<TooltipInstance>()

const popoverRef = computed(() => tooltipRef.value?.popperRef)
const popoverStyle = computed(() => {
  return [
    { width: isNumber(props.width) ? props.width + 'px' : props.width },
    props.popperStyle
  ]
})
const popoverClass = computed(() => {
  return [
    props.popperClass!,
    ns.b()
  ]
})

const beforeEnter = () => {
  emit('before-enter')
}

const beforeLeave = () => {
  emit('before-leave')
}

const afterEnter = () => {
  emit('after-enter')
}

const hide = () => {
  tooltipRef.value?.hide()
}

const afterLeave = () => {
  emit('update:visible', false)
  emit('after-leave')
}

defineExpose({
  popoverRef,
  hide
})
</script>
