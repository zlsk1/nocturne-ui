<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  RiCloseLine as Close,
  RiCloseCircleFill as Error,
  RiInformationFill as Info,
  RiCheckboxCircleFill as Success,
  RiErrorWarningFill as Warning
} from '@remixicon/vue'
import { alertEmits, alertProps } from './alert'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NAlert'
})

const props = defineProps(alertProps)
const emit = defineEmits(alertEmits)

const ns = useNamespace('alert')

const isClose = ref(false)

const alertCls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.is('center', props.center)
])

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

const handleClose = (e: MouseEvent) => {
  isClose.value = true
  emit('close', e)
}
</script>

<template>
  <div
    :class="[...alertCls, effect === 'light' ? ns.is('light') : ns.is('dark')]"
    :style="{ display: isClose ? 'none' : '' }"
  >
    <n-icon v-if="showIcon" :class="ns.e('icon')" size="18">
      <component :is="icon" />
    </n-icon>
    <div :class="ns.e('content')">
      <span v-if="$slots.title" :class="ns.e('title')">
        <slot name="title" />
      </span>
      <span v-else-if="title" :class="ns.e('title')">
        {{ title }}
      </span>
      <p v-if="description" :class="ns.e('description')">
        {{ description }}
      </p>
      <n-icon
        v-if="closable && !closeText"
        :class="ns.e('close')"
        size="18"
        @click="handleClose"
      >
        <component :is="Close" />
      </n-icon>
      <div
        v-else
        :class="[ns.e('close'), ns.is('close-text')]"
        @click="handleClose"
      >
        {{ closeText }}
      </div>
    </div>
  </div>
</template>
