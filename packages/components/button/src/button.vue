<script lang="ts" setup>
import { useSlots } from 'vue'
import { buttonProps, buttonEmits } from './button'

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
        'is-loading': loading,
        'is-text': text
      }
    ]"
    @click="handleClick"
  >
    <template v-if="loading">
      <component
        :is="loadingIcon"
        size="14"
        :class="[
          { 'loading-icon': loading },
          'n-icon'
        ]"
      ></component>
    </template>
    <template v-else-if="icon">
      <component
        :is="icon"
        size="14"
        class-name="n-icon"
      ></component>
    </template>
    <span v-if="slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/src/base.scss';
@use '@/theme-chalk/src/button.scss';
</style>.
