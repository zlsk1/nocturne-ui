<script setup>
import { ref, onMounted, computed } from 'vue'
import FrIcon from '@/components/svg-icon/src/icon.vue'
import { messageProps, messageEmits } from './index'
import { getOffsetOrSpace, getLastOffset } from './instance'

defineOptions({
  name: 'FrMessage'
})

const props = defineProps(messageProps)
defineEmits(messageEmits)

const visible = ref(false)
const height = ref(0)
const messageRef = (null)

let stopTimer

onMounted(() => {
  visible.value = true
})

const lastOffset = computed(() => getLastOffset(props.id))

const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)

const bottom = computed(() => height.value + offset.value)

const close = () => {
  visible.value = false
}

const startTimer = () => {
  if (props.duration === 0) return
  stopTimer = setTimeout(() => {
    close()
  }, props.duration)
}

const clearTimer = () => {
  stopTimer?.()
}

defineExpose({
  visible,
  bottom,
  close
})
</script>

<template>
  <div
    v-show="visible"
    ref="messageRef"
    :class="[
      'fr-message',
      `fr-message--${type}`
    ]"
    :style="{
      top: offset + 'px'
    }"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
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
        @click="onClose"
      ></fr-icon>
    </div>
  </div>
</template>

<style>
@import '@/theme-chalk/message.scss';
</style>
