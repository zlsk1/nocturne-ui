<template>
  <!-- 展示外部图标 -->
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="fr-icon-external fr-icon"
    :class="className"
  >
  </div>
  <!-- 展示内部图标 -->
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { iconProps } from './icon'
import type { StyleValue } from 'vue'

defineOptions({
  name: 'FrIcon'
})

const props = defineProps(iconProps)

/**
 * 判断当前图标是否为外部图标
 */
function external(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const isExternal = computed(() => external(props.icon as string))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

const svgClass = computed<StyleValue>(() => {
  if (props.className && Array.isArray(props.className)) {
    const className = props.className.map(v => {
      return v
    }).join(' ')
    return 'fr-icon ' + className
  }
  else {
    return 'fr-icon'
  }
})

/**
 * 内部图标
 */
const iconName = computed(() => `#fr-icon-${props.icon}`)
</script>

<style>
@import '@/theme-chalk/icon.scss';
</style>.
