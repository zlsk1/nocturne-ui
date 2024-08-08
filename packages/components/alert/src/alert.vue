<script lang="ts" setup>
import { ref } from 'vue'
import { alertProps, alertEmits } from './alert'

defineOptions({
  name: 'NAlert'
})

defineProps(alertProps)
const emit = defineEmits(alertEmits)

const isClose = ref(false)

const handleClose = (e: MouseEvent) => {
  isClose.value = true
  emit('close', e)
}
</script>

<template>
  <div
    :class="[
      'n-alert',
      `n-alert--${type}`,
      effect === 'light' ? 'is-light' : 'is-dark',
      {
        'is-center': center
      }
    ]"
    :style="{display: isClose ? 'none' : ''}"
  >
    <n-icon
      v-if="showIcon"
      class-name="n-alert__icon"
      :icon="type"
    ></n-icon>
    <div class="n-alert__content">
      <slot name="title">
      </slot>
      <span v-if="title" class="n-alert__title">
        {{ title }}
      </span>
      <p v-if="description" class="n-alert__description">
        {{ description }}
      </p>
      <n-icon
        v-if="closable && !closeText"
        icon="close"
        class-name="n-alert__close"
        @click="handleClose"
      ></n-icon>
      <div
        v-else
        class="n-alert__close is-close-text"
        @click="handleClose"
      >
        {{ closeText }}
      </div>
    </div>
  </div>
</template>
