<script lang="ts" setup>
import { ref } from 'vue'
import { alertProps, alertEmits } from './alert'

defineOptions({
  name: 'FrAlert'
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
      'fr-alert',
      `fr-alert--${type}`,
      effect === 'light' ? 'is-light' : 'is-dark',
      {
        'is-center': center
      }
    ]"
    :style="{display: isClose ? 'none' : ''}"
  >
    <fr-icon
      v-if="showIcon"
      class-name="fr-alert__icon"
      :icon="type"
    ></fr-icon>
    <div class="fr-alert__content">
      <slot name="title">
      </slot>
      <span v-if="title" class="fr-alert__title">
        {{ title }}
      </span>
      <p v-if="description" class="fr-alert__description">
        {{ description }}
      </p>
      <fr-icon
        v-if="closable && !closeText"
        icon="close"
        class-name="fr-alert__close"
        @click="handleClose"
      ></fr-icon>
      <div
        v-else
        class="fr-alert__close is-close-text"
        @click="handleClose"
      >
        {{ closeText }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/theme-chalk/alert.scss';
</style>
