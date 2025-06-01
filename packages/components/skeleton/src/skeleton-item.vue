<template>
  <div :class="[ns.e('item'), ns.e(variant)]">
    <RiImageFill v-if="variant === 'image'" />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@nocturne-ui/composables'
import { RiImageFill } from '@remixicon/vue'
import { skeletonItemProps } from './skeleton-item'

defineOptions({
  name: 'NSkeletonItem'
})

defineProps(skeletonItemProps)

const ns = useNamespace('skeleton')
</script>
