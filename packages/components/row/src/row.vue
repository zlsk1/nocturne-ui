<template>
  <component
    :is="tag"
    :class="[
      'n-row',
      `is-justify-${justify}`,
      `is-align-${align}`
    ]"
    :style="style"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { rowProps } from './row'
import { ROW_INJECTION_KEY } from './constants'
import { provide, computed } from 'vue'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NRow'
})

const props = defineProps(rowProps)

const gutter = computed(() => props.gutter)

const style = computed<CSSProperties>(() => {
  if (!props.gutter) {
    return {}
  }
  return {
    marginLeft: `-${props.gutter / 2}px`,
    marginRight: `-${props.gutter / 2}px`
  }
})

provide(ROW_INJECTION_KEY, {
  gutter
})
</script>
