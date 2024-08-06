<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { drawerProps, drawerEmits } from './drawer'
import { RiCloseLine as Close } from '@remixicon/vue'
import NOverlay from '@/components/overlay'
import { onClickOutside } from '@vueuse/core'
import { isString, isFunction } from '@/utils'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'NDrawer',
  components: {
    Close,
    NOverlay
  },
  inheritAttrs: false,
  props: drawerProps,
  emits: drawerEmits,
  setup(props, { emit }) {
    const drawerRef = ref<HTMLElement>()

    const size = computed<CSSProperties>(() => {
      if (props.placement === 'right' || props.placement === 'left') {
        return {
          width: isString(props.size) ? props.size : props.size + '%'
        }
      }
      else if (props.placement === 'top' || props.placement === 'bottom') {
        return {
          height: isString(props.size) ? props.size : props.size + '%'
        }
      }
      return {}
    })

    const zIndex = computed<CSSProperties>(() => {
      return {
        zIndex: isString(props.zIndex) ? props.zIndex : Number(props.zIndex)
      }
    })

    onMounted(() => {
      onClickOutside(drawerRef, () => {
        close()
      })
    })

    function close() {
      if (isFunction(props.beforeClose)) {
        props.beforeClose(() => emit('update:modelValue', false))
      }
      else {
        emit('update:modelValue', false)
      }
    }
    return {
      drawerRef,
      size,
      zIndex,
      close
    }
  }
})
</script>

<template>
  <transition
    name="n-drawer"
    @leave="$emit('close')"
    @enter="$emit('open')"
  >
    <n-overlay v-show="modelValue" :class="maskerClass">
      <div
        ref="drawerRef"
        :class="['n-drawer', `is-${placement}`]"
        :style="[size, zIndex]"
      >
        <div class="n-drawer__header">
          <slot name="header"></slot>
          <i
            v-if="showClose"
            class="n-drawer__close"
            @click="close"
          >
            <Close size="20"></Close>
          </i>
        </div>
        <div class="n-drawer__content">
          <slot name="content"></slot>
        </div>
        <div class="n-drawer__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </n-overlay>
  </transition>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/src/drawer.scss';
</style>
