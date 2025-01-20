<template>
  <div :class="ns.e('total')">总共{{ total }}条</div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@/composables'
import { totalProps } from './total'

defineProps(totalProps)

const ns = useNamespace('pagination')
</script>
