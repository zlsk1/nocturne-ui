<template>
  <span
    ref="arrowRef"
    class="n-popper__arrow"
    data-popper-arrow
    :style="arrowStyle"
  ></span>
</template>

<script lang="ts" setup>
import { inject, watch, onBeforeUnmount } from 'vue'
import { popperArrowProps } from './arrow'
import { POPPER_CONTENT_INJECTION_KEY } from './constants'

defineOptions({
  name: 'NPopperArrow'
})

const props = defineProps(popperArrowProps)

const { arrowOffset, arrowRef, arrowStyle } = inject(
  POPPER_CONTENT_INJECTION_KEY,
  undefined
)!

watch(
  () => props.arrowOffset,
  (val) => {
    arrowOffset.value = val
  }
)

onBeforeUnmount(() => {
  arrowRef.value = undefined
})

defineExpose({
  arrowRef
})
</script>
