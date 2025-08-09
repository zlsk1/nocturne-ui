<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import NOverlay from '@nocturne-ui/components/overlay'
import { isFunction, isString } from '@nocturne-ui/utils'
import {
  useNamespace,
  useSameTarget,
  useZIndex
} from '@nocturne-ui/composables'
import { drawerEmits, drawerProps } from './drawer'
import type { StyleValue } from 'vue'

export default defineComponent({
  name: 'NDrawer',
  components: {
    CloseOutlined,
    NOverlay
  },
  inheritAttrs: false,
  props: drawerProps,
  emits: drawerEmits,
  setup(props, { emit }) {
    const drawerRef = ref<HTMLElement>()
    const { nextZIndex } = useZIndex()
    const zIndex = nextZIndex()
    const ns = useNamespace('drawer')

    const size = computed<StyleValue>(() => {
      if (!props.size) return
      if (props.placement === 'right' || props.placement === 'left') {
        return {
          width: isString(props.size) ? props.size : `${props.size}%`
        }
      } else if (props.placement === 'top' || props.placement === 'bottom') {
        return {
          height: isString(props.size) ? props.size : `${props.size}%`
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
      } else {
        emit('update:modelValue', false)
      }
    }

    return {
      drawerRef,
      size,
      actualZIndex,
      overlayEvent,
      close,
      ns
    }
  }
})
</script>

<template>
  <transition name="n-drawer" @leave="$emit('close')" @enter="$emit('open')">
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
          :class="[ns.b(), ns.is(placement)]"
          :style="[size, { zIndex }]"
        >
          <div :class="ns.e('header')">
            <slot name="header" />
            <i v-if="showClose" :class="ns.e('close')" @click="close">
              <CloseOutlined size="20" />
            </i>
          </div>
          <div :class="ns.e('content')">
            <slot name="content" />
          </div>
          <div :class="ns.e('footer')">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </n-overlay>
  </transition>
</template>
