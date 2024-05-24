<template>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <slot></slot>
</template>
<script setup>
import { ref, provide, computed } from 'vue'
import { popperProps } from './popper'

defineOptions({
  name: 'FrPopper'
})

const props = defineProps(popperProps)

const referenceRef = ref()
const contentRef = ref()
const arrowRef = ref()
const instancePopperRef = ref()
const role = computed(() => props.role)

const popperProvide = {
  referenceRef,
  contentRef,
  arrowRef,
  instancePopperRef,
  role
}

defineExpose(popperProvide)
provide('popperProvide', popperProvide)
</script>

<style scoped>
@import '@/theme-chalk/popper.scss';
</style>
