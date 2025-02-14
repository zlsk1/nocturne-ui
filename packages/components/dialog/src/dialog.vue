<template>
  <transition :name="transition" @enter="$emit('open')" @leave="$emit('close')">
    <n-overlay
      v-show="modelValue"
      :custom-class="maskerClass"
      :masker="masker"
      custom-event
      :z-index="zIndex"
    >
      <div
        class="n-overlay-dialog"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <div :class="dialogCls" :style="dialogStyle">
          <div v-if="!$slots.header" :class="ns.e('header')">
            <div :class="ns.e('title')">{{ title }}</div>
            <component
              :is="closeIcon"
              v-if="closeIcon"
              :class="ns.e('close')"
              @click="close"
            />
            <Close
              v-else-if="showClose"
              size="18"
              :class="ns.e('close')"
              @click="close"
            />
          </div>
          <slot v-else name="header" />
          <div :class="ns.e('content')">
            <div v-if="content">{{ content }}</div>
            <slot v-else />
          </div>
          <div v-if="!$slots.footer" :class="ns.e('footer')">
            <n-button v-if="showCancel" @click="handleCancel">{{
              cancelText
            }}</n-button>
            <n-button v-if="showConfirm" type="primary" @click="handleConfirm">
              {{ confirmText }}
            </n-button>
          </div>
          <slot v-else name="footer" />
        </div>
      </div>
    </n-overlay>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RiCloseLine as Close } from '@remixicon/vue'
import { isFunction, isString } from 'lodash'
import { useNamespace, useSameTarget, useZIndex } from '@/composables'

import NButton from '@/components/button'
import NOverlay from '@/components/overlay'
import { dialogEmits, dialogProps } from './dialog'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NDialog'
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const { nextZIndex } = useZIndex()
const zIndex = nextZIndex()
const ns = useNamespace('dialog')

const dialogStyle = computed<CSSProperties>(() => {
  return {
    width: isString(props.width) ? props.width : `${props.width}%`,
    margin: `${dialogMargin.value} auto auto`
  }
})

const dialogCls = computed(() => [
  ns.b(),
  ns.is('center', props.center),
  props.customClass
])

const dialogMargin = computed(() =>
  isString(props.offsetTop) ? props.offsetTop : `${props.offsetTop}vh`
)

const close = () => {
  if (isFunction(props.beforeClose)) {
    props.beforeClose(() => emit('update:modelValue', false))
  } else {
    emit('update:modelValue', false)
  }
}

const handleConfirm = () => {
  props.callback?.('confirm')
}

const handleCancel = () => {
  props.callback?.('cancel')
}

const clickMaskerToClose = () => {
  if (props.clickMaskerToClose) {
    emit('update:modelValue', false)
  }
}

const overlayEvent = useSameTarget(clickMaskerToClose)
</script>
