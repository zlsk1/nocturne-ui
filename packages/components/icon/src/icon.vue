<template>
  <i :class="ns.b()" :style="svgStyle">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { iconProps } from './icon'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NIcon'
})

const props = defineProps(iconProps)

const ns = useNamespace('icon')

const svgStyle = computed<CSSProperties>(() => {
  return {
    color: props.color,
    fontSize: `${props.size}px`
  }
})
</script>
