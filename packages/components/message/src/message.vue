<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { messageProps, messageEmits } from './message'
import { getOffsetOrSpace, getLastOffset } from './instance'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { FrBadge } from '@/components'
import { BadgeProps } from '@/components/badge'
import {
  RiInformationFill as info,
  RiCheckboxFill as success,
  RiErrorWarningFill as warning,
  RiCloseCircleFill as error,
  RiCloseLine as Close
} from '@remixicon/vue'

defineOptions({
  name: 'FrMessage'
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
      return info
    case 'success':
      return success
    case 'error':
      return error
    case 'warning':
      return warning
  }
  return info
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
    name="fr-message-fade"
    @before-leave="onClose!"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      ref="messageRef"
      :class="[
        'fr-message',
        `fr-message--${type}`,
        customClass
      ]"
      :style="{
        top: offset + 'px'
      }"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <FrBadge
        v-if="repeatNum > 1"
        class="fr-message__badge"
        :value="repeatNum"
        :type="badgeType"
      ></FrBadge>
      <component
        :is="icon"
        :class-name="`fr-message-icon--${type}`"
        size="18"
      ></component>
      <div class="fr-message__content">
        <slot name="title">
        </slot>
        <span class="fr-message__title">
          {{ message }}
        </span>
        <Close
          v-if="showClose"
          class-name="fr-message__close"
          size="18"
          @click.stop="close"
        ></Close>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/message.scss';
</style>
