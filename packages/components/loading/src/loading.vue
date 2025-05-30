<template>
  <div :class="[ns.b(), ns.is('fullScreen', fullScreen)]" :style="style">
    <div :class="ns.e('content')">
      <RiLoader5Line v-if="icon === 'Loader'" :class="ns.e('icon')" />
      <component :is="icon" v-else />
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RiLoader5Line } from '@remixicon/vue'
import { useNamespace } from '@nocturne-ui/composables'
import { loadingProps } from './loading'
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
