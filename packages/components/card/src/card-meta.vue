<template>
  <div :class="ns.b('meta')">
    <slot name="avatar">
      <n-avatar :src="avatar" />
    </slot>
    <div :class="ns.bm('meta', 'wrapper')">
      <div v-if="$slots.title || title" :class="ns.be('meta', 'title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="$slots.description || description"
        :class="ns.be('meta', 'desc')"
      >
        <slot name="description">
          <p>{{ description }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@nocturne-ui/composables'
import NAvatar from '@nocturne-ui/components/avatar'
import { cardMetaProps } from './card-meta'

defineOptions({
  name: 'NCardMeta'
})

defineProps(cardMetaProps)

const ns = useNamespace('card')
</script>
