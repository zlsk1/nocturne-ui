<template>
  <transition
    :name="ns.b()"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="notificationRef"
      :class="notifyCls"
      :style="style"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <span :class="ns.e('icon')">
        <component :is="icon || customIcon" />
      </span>
      <div :class="ns.m('main')">
        <h4 v-if="title" :class="ns.e('title')">{{ title }}</h4>
        <p v-if="!isVNode(content)" :class="ns.e('content')">{{ content }}</p>
        <p v-else :class="ns.e('content')">
          <slot />
        </p>
        <i :class="ns.e('close')">
          <Close size="20" @click="close" />
        </i>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, isVNode, onMounted, ref } from 'vue'
import {
  RiCloseLine as Close,
  RiCloseCircleFill as Error,
  RiInformationFill as Info,
  RiCheckboxCircleFill as Success,
  RiErrorWarningFill as Warning
} from '@remixicon/vue'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { notificationEmit, notificationProps } from './notification'
import type { CSSProperties } from 'vue'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NNotification'
})

const props = defineProps(notificationProps)

defineEmits(notificationEmit)

const ns = useNamespace('notification')

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

const positionClass = computed(() =>
  props.placement.endsWith('left') ? 'is-left' : 'is-right'
)

const position = computed(() =>
  props.placement.startsWith('top') ? 'top' : 'bottom'
)

const style = computed<CSSProperties>(() => {
  return {
    [position.value]: `${props.offset}px`,
    zIndex: props.zIndex
  }
})

const notifyCls = computed(() => [
  ns.b(),
  ns.m(props.type),
  positionClass.value
])

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
    ;({ stop: stopTimer } = useTimeoutFn(() => {
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
