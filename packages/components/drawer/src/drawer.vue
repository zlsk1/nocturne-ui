<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { drawerProps, drawerEmits } from './drawer'
import { RiCloseLine as Close } from '@remixicon/vue'
import NOverlay from '@/components/overlay'
import { isString, isFunction } from '@/utils'
import { useSameTarget, useZIndex } from '@/composables'

import type { StyleValue } from 'vue'

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
    const { nextZIndex } = useZIndex()
    const zIndex = nextZIndex()

    const size = computed<StyleValue>(() => {
      if (!props.size) return
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

    const actualZIndex = computed(() => {
      if (!props.zIndex) {
        return zIndex
      }
      return isString(props.zIndex) ? Number(props.zIndex) : props.zIndex
    })

    function clickMaskerToClose() {
      if (props.clickMaskerToClose) {
        emit('update:modelValue', false)
      }
    }

    const overlayEvent = useSameTarget(clickMaskerToClose)

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
      actualZIndex,
      overlayEvent,
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
    <n-overlay
      v-show="modelValue"
      :custom-class="maskerClass"
      :masker="masker"
      custom-event
      :z-index="actualZIndex"
    >
      <div
        class="n-overlay-drawer"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <div
          ref="drawerRef"
          :class="['n-drawer', `is-${placement}`]"
          :style="[size, { zIndex }]"
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
      </div>
    </n-overlay>
  </transition>
</template>
