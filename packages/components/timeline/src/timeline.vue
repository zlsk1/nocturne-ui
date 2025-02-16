<script lang="ts" setup>
import { useNamespace } from '@nocturne-ui/composables'

defineOptions({
  name: 'NTimeline'
})

const ns = useNamespace('timeline')
</script>

<template>
  <ul :class="ns.b()">
    <slot />
  </ul>
</template>
