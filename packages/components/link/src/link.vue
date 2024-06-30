<script lang="ts" setup>
import { linkProps } from './link'

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
    <component
      :is="icon"
      v-if="icon"
      size="16"
    ></component>
  </a>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/link.scss'
</style>
