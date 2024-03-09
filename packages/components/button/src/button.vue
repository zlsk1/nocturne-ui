<script setup>
import { buttonProps } from './props'

defineOptions({
  name: 'FrButton'
})

defineProps(buttonProps)
</script>

<template>
  <div>
    <button
      :class="[
        'fr-button',
        type ? 'fr-button--' + type : '',
        size ? 'fr-button--' + size : '',
        {
          'is-round': round,
          'is-plain': plain,
          'is-circle': circle,
          'is-disabled': disabled,
        }
      ]"
    >
      <slot></slot>
    </button>
  </div>
</template>

<style>
@import '@/theme-chalk/base.scss';
@import '@/theme-chalk/button.scss';
</style>
