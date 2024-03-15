<script setup>
import { computed } from 'vue'
import { avatarProps, avatarEmits } from './index'
defineOptions({
  name: 'FrAvatar'
})

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const sizeIsNumber = computed(() => {
  return typeof (props.size) === 'number'
})

const onError = (e) => {
  emit('error', e)
}
</script>

<template>
  <div
    :class="[
      'fr-avatar',
      sizeIsNumber ? '' : `fr-avatar--${size}`,
      `fr-avatar--${shape}`
    ]"
    :style="{
      width: sizeIsNumber ? size + 'px' : '',
      height: sizeIsNumber ? size + 'px' : '',
    }"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="fr-avatar__img"
      :style="{ objectFit: fit }"
      @error="onError"
    >
    <fr-icon
      v-else-if="icon"
      :icon="icon"
      class-name="fr-avatar__icon"
    >
    </fr-icon>
    <slot></slot>
  </div>
</template>

<style>
@import '@/theme-chalk/avatar.scss';
</style>
