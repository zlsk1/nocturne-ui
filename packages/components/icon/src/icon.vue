<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <i
    v-if="$slots.default"
    class="n-icon"
    :class="svgClass"
    :style="svgStyle"
  >
    <slot></slot>
  </i>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { iconProps } from './icon'
import { isString } from '@/utils'
import type { StyleValue, CSSProperties } from 'vue'

defineOptions({
  name: 'NIcon'
})

const props = defineProps(iconProps)

const svgClass = computed<StyleValue>(() => {
  if (isString(props.className)) {
    return 'n-icon ' + props.className
  }
  else if (Array.isArray(props.className)) {
    const className = props.className.map(v => {
      return v
    }).join(' ')
    return 'n-icon ' + className
  }
  else {
    return 'n-icon'
  }
})

const svgStyle = computed<CSSProperties>(() => {
  return {
    color: props.color,
    fontSize: props.size + 'px'
  }
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/icon.scss';
</style>.
