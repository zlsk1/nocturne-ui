<template>
  <div>
    <!-- 展示外部图标 -->
    <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-external-icon svg-icon"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { svgIconProps } from './props'

defineOptions({
  name: 'SvgIcon'
})

const props = defineProps(svgIconProps)

/**
 * 判断当前图标是否为外部图标
 */
function external (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const isExternal = computed(() => external(props))
/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
})

/**
 * 内部图标
 */
const iconName = computed(() => `#fr-icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
