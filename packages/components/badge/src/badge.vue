<script lang="ts" setup>
import { computed } from 'vue'
import { badgeProps } from './badge'
import { isNumber } from '@/utils'

defineOptions({
  name: 'NBadge'
})

const props = defineProps(badgeProps)

const _value = computed(() => {
  if (isNumber(props.value) && props.value > props.max) {
    return `${props.max}+`
  }
  return props.value
})
</script>

<template>
  <div class="n-badge">
    <span>
      <slot></slot>
    </span>
    <span
      v-if="!hidden"
      :class="[
        'n-badge__content',
        'is-fixed',
        type ? 'n-badge__content--' + type: '',
        {
          'is-dot': dot
        }
      ]"
    >
      <template v-if="!dot">
        {{ _value }}
      </template>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme-chalk/src/badge.scss';
</style>
