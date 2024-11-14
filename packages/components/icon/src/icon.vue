<template>
  <i :class="ns.b()" :style="svgStyle">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { iconProps } from './icon'
import { useNamespace } from '@/composables'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NIcon'
})

const props = defineProps(iconProps)

const ns = useNamespace('icon')

const svgStyle = computed<CSSProperties>(() => {
  return {
    color: props.color,
    fontSize: props.size + 'px'
  }
})
</script>
