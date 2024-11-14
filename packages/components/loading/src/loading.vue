<template>
  <div :class="ns.b()" :style="style">
    <div :class="ns.e('content')">
      <Loader
        v-if="icon"
        :class="ns.e('icon')"
        color="#409eff"
      ></Loader>
      <component :is="icon" v-else></component>
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { loadingProps } from './loading'
import { RiLoaderLine as Loader } from '@remixicon/vue'
import { useNamespace } from '@/composables'

import type { CSSProperties } from 'vue'

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
