<template>
  <div :class="ns.e('total')">
    总共{{ total }}条
  </div>
</template>

<script lang="ts" setup>
import { totalProps } from './total'
import { useNamespace } from '@/composables'

defineProps(totalProps)

const ns = useNamespace('pagination')
</script>
