<script lang="ts" setup>
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NTimeline'
})

const ns = useNamespace('timeline')
</script>

<template>
  <ul :class="ns.b()">
    <slot></slot>
  </ul>
</template>
