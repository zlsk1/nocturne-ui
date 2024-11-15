<template>
  <slot />
</template>
<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { POPPER_INJECTION_KEY } from './constants'
import { popperProps } from './popper'

import type { Instance as PopperInstance } from '@popperjs/core'
import type {
  NPopperContentInjectionContext,
  NPopperInjectionContext
} from './constants'

defineOptions({
  name: 'NPopper'
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
} as NPopperInjectionContext & NPopperContentInjectionContext

defineExpose(popperProvide)
provide(POPPER_INJECTION_KEY, popperProvide)
</script>
