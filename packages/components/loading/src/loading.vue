<template>
  <div class="n-loading" :style="style">
    <div class="n-loading--content">
      <Loader
        v-if="icon"
        class="n-loading__icon"
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

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NLoading'
})

const props = defineProps(loadingProps)

const style = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.maskBg
  }
})
</script>
