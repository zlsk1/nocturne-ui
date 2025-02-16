<template>
  <component
    :is="tag"
    :class="[ns.b(), `is-justify-${justify}`, `is-align-${align}`]"
    :style="style"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { rowProps } from './row'
import { ROW_INJECTION_KEY } from './constants'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NRow'
})

const props = defineProps(rowProps)

const ns = useNamespace('row')

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
