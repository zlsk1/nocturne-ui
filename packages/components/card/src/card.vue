<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">{{ header }}</div>
    <div :class="[ns.e('content'), ContentClass]">
      <slot name="default" />
    </div>
    <div :class="ns.e('footer')">{{ footer }}</div>
  </div>
</template>

<script lang="ts" setup>
import { cardProps } from './card'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NCard'
})

defineProps(cardProps)

const ns = useNamespace('card')
</script>
