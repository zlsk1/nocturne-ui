<script lang="ts" setup>
import { linkProps } from './link'
import { FrIcon } from '@/components'

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

<style lang="scss" scoped>
@use '@/theme-chalk/link.scss'
</style>
