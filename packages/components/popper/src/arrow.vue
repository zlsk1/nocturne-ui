<template>
  <span
    ref="arrowRef"
    :class="ns.e('arrow')"
    data-popper-arrow
    :style="arrowStyle"
  ></span>
</template>

<script lang="ts" setup>
import { inject, watch, onBeforeUnmount } from 'vue'
import { popperArrowProps } from './arrow'
import { POPPER_CONTENT_INJECTION_KEY } from './constants'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NPopperArrow'
})

const props = defineProps(popperArrowProps)

const { arrowOffset, arrowRef, arrowStyle } = inject(
  POPPER_CONTENT_INJECTION_KEY,
  undefined
)!

const ns = useNamespace('popper')

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
