<template>
  <div :class="[ns.b()]">tree</div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@nocturne-ui/composables'

defineOptions({
  name: 'NTree'
})

const ns = useNamespace('tree')
</script>
