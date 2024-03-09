<script setup>
import { buttonProps } from './props'

defineOptions({
  name: 'FrButton'
})

defineProps(buttonProps)
</script>

<template>
  <div>
    <button class="fr-button fr-button--danger fr-button--small is-dark">
      <slot></slot>
    </button>
  </div>
</template>

<style>
@import '@/theme-chalk/base.scss';
@import '@/theme-chalk/button.scss';

button {
  border: none;
  background: none;
}
</style>
