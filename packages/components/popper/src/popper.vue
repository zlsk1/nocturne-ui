<template>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <slot></slot>
</template>
<script lang="ts" setup>
import { ref, provide, computed } from 'vue'
import { POPPER_INJECTION_KEY } from './constants'
import { popperProps } from './popper'

import type { Instance as PopperInstance } from '@popperjs/core'
import type { ElPopperInjectionContext, ElPopperContentInjectionContext } from './constants'

defineOptions({
  name: 'FrPopper'
})

const props = defineProps(popperProps)

const referenceRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()
const instancePopperRef = ref<PopperInstance>()
const role = computed(() => props.role)

const popperProvide = {
  referenceRef,
  contentRef,
  arrowRef,
  instancePopperRef,
  role
} as ElPopperInjectionContext & ElPopperContentInjectionContext

defineExpose(popperProvide)
provide(POPPER_INJECTION_KEY, popperProvide)
</script>

<style scoped>
@import '@/theme-chalk/popper.scss';
</style>
