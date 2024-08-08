<script lang="ts" setup>
import { computed } from 'vue'
import { avatarProps, avatarEmits } from './avatar'

defineOptions({
  name: 'NAvatar'
})

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const sizeIsNumber = computed(() => {
  return typeof (props.size) === 'number'
})

const onError = (evt: Event) => {
  emit('error', evt)
}
</script>

<template>
  <div
    :class="[
      'n-avatar',
      sizeIsNumber ? '' : `n-avatar--${size}`,
      `n-avatar--${shape}`
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
      class="n-avatar__img"
      :style="{ objectFit: fit }"
      @error="onError"
    >
    <n-icon
      v-else-if="icon"
      class-name="n-avatar__icon"
    >
      <component :is="icon"></component>
    </n-icon>
    <slot></slot>
  </div>
</template>
