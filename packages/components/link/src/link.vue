<script lang="ts" setup>
import { linkProps } from './link'

defineOptions({
  name: 'NLink'
})

defineProps(linkProps)
</script>

<template>
  <a
    :class="[
      'n-link',
      type ? 'n-link--' + type : '',
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
    <component
      :is="icon"
      v-if="icon"
      size="16"
    ></component>
  </a>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/src/link.scss'
</style>
