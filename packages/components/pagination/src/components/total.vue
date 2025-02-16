<template>
  <div :class="ns.e('total')">总共{{ total }}条</div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@nocturne-ui/composables'
import { totalProps } from './total'

defineProps(totalProps)

const ns = useNamespace('pagination')
</script>
