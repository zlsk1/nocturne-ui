<template>
  <transition
    name="n-notification"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="notificationRef"
      :class="[
        'n-notification',
        type ? `n-notification--${type}`: '',
        positionClass
      ]"
      :style="style"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <span class="n-notification__icon">
        <component :is="icon || customIcon"></component>
      </span>
      <div class="n-notification--main">
        <h4 v-if="title" class="n-notification__title">{{ title }}</h4>
        <p v-if="!isVNode(content)" class="n-notification__content">{{ content }}</p>
        <p v-else class="n-notification__content">
          <slot></slot>
        </p>
        <i class="n-notification__close">
          <Close size="20" @click="close"></Close>
        </i>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, isVNode } from 'vue'
import { notificationProps, notificationEmit } from './notification'
import {
  RiInformationFill as Info,
  RiCheckboxCircleFill as Success,
  RiErrorWarningFill as Warning,
  RiCloseCircleFill as Error,
  RiCloseLine as Close
} from '@remixicon/vue'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NNotification'
})

const props = defineProps(notificationProps)

defineEmits(notificationEmit)

let stopTimer: (() => void) | undefined

const visible = ref(false)
const height = ref(0)
const notificationRef = ref<HTMLDivElement>()

const icon = computed(() => {
  switch (props.type) {
    case 'info':
      return Info
    case 'success':
      return Success
    case 'error':
      return Error
    case 'warning':
      return Warning
  }
  return Info
})

const positionClass = computed(() => props.placement.endsWith('left') ? 'is-left' : 'is-right')

const position = computed(() => props.placement.startsWith('top') ? 'top' : 'bottom')

const style = computed<CSSProperties>(() => {
  return {
    [position.value]: props.offset + 'px',
    zIndex: props.zIndex
  }
})

useResizeObserver(notificationRef, () => {
  height.value = notificationRef.value!.getBoundingClientRect().height
})

onMounted(() => {
  startTimer()
  visible.value = true
})

const close = () => {
  visible.value = false
}

const startTimer = () => {
  if (props.duration > 0) {
    ({ stop: stopTimer } = useTimeoutFn(() => {
      close()
    }, props.duration))
  }
}

const onMouseenter = () => {
  stopTimer?.()
}

const onMouseleave = () => {
  startTimer()
}

defineExpose({
  visible,
  height
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/notification.scss';
</style>
