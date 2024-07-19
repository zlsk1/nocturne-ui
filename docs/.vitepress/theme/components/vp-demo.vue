<template>
  <div>
    <ClientOnly>
      <!-- <component :is="formatPathDemos[src]" v-if="formatPathDemos[src]"></component> -->
      <component :is="formatPathDemos[src]"></component>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  demos: {
    type: Object,
    default: () => ({})
  },
  codes: {
    type: Object,
  }
})

const decoded = computed(() => {
  return decodeURIComponent(props.codes as unknown as string)
})

const formatPathDemos = computed(() => {
  const demos = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('/demo/', '').replace('.vue', '')] = props.demos[key]
  })
  return demos
})
</script>