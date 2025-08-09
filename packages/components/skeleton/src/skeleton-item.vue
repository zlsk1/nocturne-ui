<template>
  <div :class="[ns.e('item'), ns.e(variant)]">
    <FileImageFilled v-if="variant === 'image'" />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@nocturne-ui/composables'
import { FileImageFilled } from '@ant-design/icons-vue'
import { skeletonItemProps } from './skeleton-item'

defineOptions({
  name: 'NSkeletonItem'
})

defineProps(skeletonItemProps)

const ns = useNamespace('skeleton')
</script>
