<template>
  <div class="demo-container">
    <p v-html="decodeDescription" class="demo-description mb-4"></p>
    <ClientOnly>
      <component :is="formatPathDemos[src]" v-if="formatPathDemos[src]"></component>
    </ClientOnly>
    <div class="demo-source-wrapper">
      <div v-html="decoded" class="demo-source language-vue"></div>
    </div>
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
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

const decoded = computed(() => {
  return decodeURIComponent(props.codes)
})

const decodeDescription = computed(() => {
  return decodeURIComponent(props.description)
})

const formatPathDemos = computed(() => {
  const demos = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('/demo/', '').replace('.vue', '')] = props.demos[key]
  })
  return demos
})
</script>