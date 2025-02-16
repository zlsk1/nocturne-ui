<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">{{ header }}</div>
    <div :class="[ns.e('content'), contentClass]">
      <slot name="default" />
    </div>
    <div :class="ns.e('footer')">{{ footer }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@nocturne-ui/composables'
import { cardProps } from './card'

defineOptions({
  name: 'NCard'
})

defineProps(cardProps)

const ns = useNamespace('card')
</script>
