<template>
  <i class="n-icon" :style="svgStyle">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { iconProps } from './icon'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NIcon'
})

const props = defineProps(iconProps)

const svgStyle = computed<CSSProperties>(() => {
  return {
    color: props.color,
    fontSize: props.size + 'px'
  }
})
</script>
