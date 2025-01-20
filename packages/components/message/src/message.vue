<template>
  <transition
    :name="`${ns.ns.value}-message-fade`"
    @before-leave="onClose!"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[ns.b(), ns.m(type), customClass]"
      :style="{
        top: offset + 'px',
        zIndex: zIndex
      }"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <n-badge
        v-if="repeatNum > 1"
        :class="ns.m('badge')"
        :value="repeatNum"
        :type="badgeType"
      />
      <component :is="icon" :class="ns.bm(icon.value, type)" size="18" />
      <div :class="ns.e('content')">
        <span v-if="!isVNode(message)" :class="ns.e('title')">
          {{ message }}
        </span>
        <span v-else :class="ns.e('title')">
          <slot />
        </span>
        <Close
          v-if="showClose"
          :class="ns.e('close')"
          size="18"
          @click.stop="close"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, isVNode, onMounted, ref, watch } from 'vue'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { RiCloseLine as Close } from '@remixicon/vue'
import NBadge from '@/components/badge'
import { useNamespace } from '@/composables'
import { typeIcons } from '@/utils'
import { messageEmits, messageProps } from './message'
import { getLastOffset, getOffsetOrSpace } from './instance'
import type { BadgeProps } from '@/components/badge'

defineOptions({
  name: 'NMessage'
})

const props = defineProps(messageProps)
defineEmits(messageEmits)

const ns = useNamespace('message')

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

const offset = computed(
  () => getOffsetOrSpace(props.id, props.offset) + lastOffset.value
)

const bottom = computed(() => height.value + offset.value)

const badgeType = computed<BadgeProps['type']>(() =>
  props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info'
)

const icon = computed(() => {
  const { type } = props
  switch (type) {
    case 'info':
      return typeIcons[type]
    case 'success':
      return typeIcons[type]
    case 'error':
      return typeIcons[type]
    case 'warning':
      return typeIcons[type]
    default:
      return typeIcons['info']
  }
})

const close = () => {
  visible.value = false
}

const startTimer = () => {
  if (props.duration === 0) return
  ;({ stop: stopTimer } = useTimeoutFn(() => {
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
