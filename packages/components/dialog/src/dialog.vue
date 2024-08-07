<template>
  <transition
    :name="transition"
    @enter="$emit('open')"
    @leave="$emit('close')"
  >
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
        <div
          ref="dialogRef"
          :class="['n-dialog', { 'is-center': center }, customClass]"
          :style="dialogStyle"
        >
          <div v-if="!$slots.header" class="n-dialog__header">
            <div class="n-dialog__title">{{ title }}</div>
            <component
              :is="closeIcon"
              v-if="closeIcon"
              class="n-dialog__close"
              @click="close"
            ></component>
            <Close
              v-else-if="showClose"
              size="18"
              class="n-dialog__close"
              @click="close"
            ></Close>
          </div>
          <slot v-else name="header"></slot>
          <div class="n-dialog__content">
            <div v-if="content">{{ content }}</div>
            <slot v-else></slot>
          </div>
          <div v-if="!$slots.footer" class="n-dialog__footer">
            <n-button v-if="showCancel" @click="handleCancel">{{ cancelText }}</n-button>
            <n-button
              v-if="showConfirm"
              type="primary"
              @click="handleConfirm"
            >
              {{ confirmText }}
            </n-button>
          </div>
          <slot v-else name="footer"></slot>
        </div>
      </div>
    </n-overlay>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NButton, NOverlay } from '@/components'
import { RiCloseLine as Close } from '@remixicon/vue'
import { dialogProps, dialogEmits } from './dialog'
import { isString, isFunction } from 'lodash'
import { useSameTarget, useZIndex } from '@/composables'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NDialog'
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const dialogRef = ref<HTMLElement>()
const { nextZIndex } = useZIndex()
const zIndex = nextZIndex()

const dialogStyle = computed<CSSProperties>(() => {
  return {
    width: isString(props.width) ? props.width : props.width + 'px',
    margin: `${dialogMargin.value} auto auto`
  }
})

const dialogMargin = computed(() => isString(props.offsetTop) ? props.offsetTop : props.offsetTop + 'vh')

const close = () => {
  if (isFunction(props.beforeClose)) {
    props.beforeClose(() => emit('update:modelValue', false))
  }
  else {
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

<style lang="scss" scoped>
@use '@/theme-chalk/src/dialog.scss';
</style>
