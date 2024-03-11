<script setup>
import { linkProps } from './index'

defineOptions({
  name: 'FrLink'
})

defineProps(linkProps)
</script>

<template>
  <a
    :class="[
      'fr-link',
      type ? 'fr-link--' + type : '',
      {
        'is-underline': !disabled && underline,
        'is-disabled': disabled,
      }
    ]"
    :href="href"
    :target="target"
  >
    <span>
      <slot></slot>
    </span>
    <fr-icon
      v-if="icon"
      :icon="icon"
    ></fr-icon>
  </a>
</template>

<style>
@import '@/theme-chalk/link.scss'
</style>
