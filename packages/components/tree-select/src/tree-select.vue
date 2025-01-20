<template>
  <div :class="ns.b()">tree-select</div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@/composables'
import { treeSelectProps } from './tree-select'

defineOptions({
  name: 'NTreeSelect'
})

defineProps(treeSelectProps)

const ns = useNamespace('tree-select')
</script>
