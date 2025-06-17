<template>
  <div
    :class="[
      ns.b(),
      ns.is('hoverable', hoverable),
      ns.is('borderless', borderless),
      ns.m(size)
    ]"
  >
    <img v-if="cover" :class="ns.m('cover')" :src="cover" alt="" />
    <div v-if="$slots.header || $slots.extra || title" :class="ns.e('header')">
      <span>{{ title }}</span>
      <slot name="extra" />
    </div>
    <div v-if="$slots.default || meta" :class="[ns.e('content'), contentClass]">
      <template v-if="!loading">
        <slot name="default" />
        <n-card-meta v-if="meta" v-bind="{ ...meta }" />
      </template>
      <n-skeleton v-else-if="loading" animated />
    </div>
    <div v-if="$slots.action" :class="ns.e('action')">
      <slot name="action" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@nocturne-ui/composables'
import NSkeleton from '@nocturne-ui/components/skeleton'
import { cardProps } from './card'
import NCardMeta from './card-meta.vue'

defineOptions({
  name: 'NCard'
})

defineProps(cardProps)

const ns = useNamespace('card')
</script>
