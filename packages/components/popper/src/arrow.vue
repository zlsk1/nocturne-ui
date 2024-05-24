<template>
  <span
    ref="arrowRef"
    class="fr-popper__arrow"
    data-popper-arrow
    :style="arrowStyle"
  ></span>
</template>

<script setup>
import { inject, watch, onBeforeUnmount } from 'vue'
import { popperArrowProps } from './arrow'

defineOptions({
  name: 'FrPopperArrow'
})

const props = defineProps(popperArrowProps)

const { arrowOffset, arrowRef, arrowStyle } = inject(
  'popperContentProvide',
  undefined
)

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

<style scoped>
@import '@/theme-chalk/popper.scss';
</style>
