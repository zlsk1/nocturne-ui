<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NButtonGroup'
})

const ns = useNamespace('button-group')
</script>
