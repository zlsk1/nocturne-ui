<template>
  <div :class="['n-overlay', customClass]" :style="overlayStyle">
    <div class="n-overlay__content" :style="contentZIndex">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useZIndex } from '@/composables'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'NOverlay',
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    zIndex: Number,
    bg: {
      type: String,
      default: 'rgba(0, 0, 0, .5)'
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { nextZIndex } = useZIndex()

    const overlayStyle = computed(() => {
      return {
        zIndex: props.zIndex || nextZIndex.value,
        backgroundColor: props.bg
      }
    })
    const contentZIndex = computed<CSSProperties>(() => {
      return {
        zIndex: overlayStyle.value.zIndex + 1
      }
    })

    return {
      overlayStyle,
      contentZIndex
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/overlay.scss';
</style>
