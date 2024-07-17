<script lang="ts" setup>
import { useSlots } from 'vue'
import { buttonProps, buttonEmits } from './button'
import { RiLoaderLine } from '@remixicon/vue'

defineOptions({
  name: 'NButton'
})

defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const slots = useSlots()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <button
    :class="[
      'n-button-wrapper',
      'n-button',
      type ? 'n-button--' + type : '',
      size ? 'n-button--' + size : '',
      {
        'is-round': round,
        'is-plain': plain,
        'is-circle': circle,
        'is-disabled': disabled,
      }
    ]"
    @click="handleClick"
  >
    <template v-if="loading">
      <component
        :is="RiLoaderLine"
        class="n-icon"
        size="14"
      ></component>
    </template>
    <template v-else-if="icon">
      <component
        :is="icon"
        class="n-icon"
        size="14"
      ></component>
    </template>
    <span v-if="slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/base.scss';
@use '@/theme-chalk/button.scss';
</style>.
