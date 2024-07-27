<script lang="ts" setup>
import { ref, onMounted, computed, watch, isVNode } from 'vue'
import { messageProps, messageEmits } from './message'
import { getOffsetOrSpace, getLastOffset } from './instance'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { NBadge } from '@/components'
import { BadgeProps } from '@/components/badge'
import {
  RiInformationFill as Info,
  RiCheckboxCircleFill as Success,
  RiErrorWarningFill as Warning,
  RiCloseCircleFill as Error,
  RiCloseLine as Close
} from '@remixicon/vue'

defineOptions({
  name: 'NMessage'
})

const props = defineProps(messageProps)
defineEmits(messageEmits)

const visible = ref(false)
const height = ref(0)
const messageRef = ref<HTMLElement>()

let stopTimer: (() => void) | undefined

onMounted(() => {
  startTimer()
  visible.value = true
})

watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  }
)

const lastOffset = computed(() => getLastOffset(props.id))

const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)

const bottom = computed(() => height.value + offset.value)

const badgeType = computed<BadgeProps['type']>(() =>
  props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info'
)

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

const close = () => {
  visible.value = false
}

const startTimer = () => {
  if (props.duration === 0) return
  ({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, props.duration))
}

const clearTimer = () => {
  stopTimer?.()
}

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  visible,
  bottom,
  close
})
</script>

<template>
  <transition
    name="n-message-fade"
    @before-leave="onClose!"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[
        'n-message',
        `n-message--${type}`,
        customClass
      ]"
      :style="{
        top: offset + 'px',
        zIndex: zIndex
      }"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <NBadge
        v-if="repeatNum > 1"
        class="n-message__badge"
        :value="repeatNum"
        :type="badgeType"
      ></NBadge>
      <component
        :is="icon"
        :class-name="`n-message-icon--${type}`"
        size="18"
      ></component>
      <div class="n-message__content">
        <span v-if="!isVNode(message)" class="n-message__title">
          {{ message }}
        </span>
        <span v-else class="n-message__title">
          <slot></slot>
        </span>
        <Close
          v-if="showClose"
          class-name="n-message__close"
          size="18"
          @click.stop="close"
        ></Close>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/src/message.scss';
</style>
