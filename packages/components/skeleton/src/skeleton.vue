<template>
  <div v-if="loading" :class="cls">
    <slot v-if="loading" name="extra">
      <n-skeleton-item :class="ns.is('first')" variant="p" />
      <n-skeleton-item
        v-for="item in rows"
        :key="item"
        :class="[ns.e('paragraph'), ns.is('last', item === rows && rows > 1)]"
        variant="p"
      />
    </slot>
  </div>
  <slot v-else v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { skeletonProps } from './skeleton'
import NSkeletonItem from './skeleton-item.vue'

defineOptions({
  name: 'NSkeleton'
})

const props = defineProps(skeletonProps)

const ns = useNamespace('skeleton')

const cls = computed(() => [ns.b(), ns.is('animated', props.animated)])
</script>
