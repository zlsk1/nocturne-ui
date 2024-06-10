<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { FrIcon } from '@/components'
import { messageProps, messageEmits } from './message'
import { getOffsetOrSpace, getLastOffset } from './instance'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { FrBadge } from '@/components'
import { BadgeProps } from '@/components/badge'

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
      <fr-icon
        :class-name="`fr-message-icon--${type}`"
        :icon="type"
      ></fr-icon>
      <div class="fr-message__content">
        <slot name="title">
        </slot>
        <span class="fr-message__title">
          {{ message }}
        </span>
        <fr-icon
          v-if="showClose"
          icon="close"
          class-name="fr-message__close"
          @click.stop="close"
        ></fr-icon>
      </div>
    </div>
  </transition>
</template>

<style>
@import '@/theme-chalk/message.scss';
</style>
