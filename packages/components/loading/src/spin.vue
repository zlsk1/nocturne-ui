<template>
  <div
    :class="[
      ns.b(),
      ns.is('loading', loading),
      ns.is('fullScreen', fullScreen),
      $slots.default && ns.m('nested')
    ]"
  >
    <div v-if="$slots.default" :class="ns.e('content')" :style="style">
      <slot />
    </div>
    <div v-if="loading" :class="ns.e('loader')">
      <RiLoader5Line v-if="icon === 'Loader'" :class="ns.e('icon')" />
      <component :is="icon" v-else :class="ns.e('icon')" />
      <div v-if="text" :class="ns.e('text')">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RiLoader5Line } from '@remixicon/vue'
import { useNamespace } from '@nocturne-ui/composables'
import { spinProps } from './spin'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NSpin'
})

const props = defineProps(spinProps)

const ns = useNamespace('spin')

const style = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.maskBg
  }
})
</script>
