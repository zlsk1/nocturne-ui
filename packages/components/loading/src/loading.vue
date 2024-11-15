<template>
  <div :class="ns.b()" :style="style">
    <div :class="ns.e('content')">
      <Loader v-if="icon" :class="ns.e('icon')" color="#409eff" />
      <component :is="icon" v-else />
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RiLoaderLine as Loader } from '@remixicon/vue'
import { loadingProps } from './loading'
import type { CSSProperties } from 'vue'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NLoading'
})

const props = defineProps(loadingProps)

const ns = useNamespace('loading')

const style = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.maskBg
  }
})
</script>
