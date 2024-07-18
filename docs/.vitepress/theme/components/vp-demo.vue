<template>
  <div>
    <component :is="demo" v-if="demo"></component>
  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw, watchEffect } from 'vue'

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
    default: () => ({})
  }
})

const demo = ref<Record<string, any>>()
const code = ref(undefined)

watchEffect(() => {
  internalInit()
})

function internalInit () {
  const basePath = `/demo/${props.src}.vue`
  const path = Object.keys(props.demos).find(path => path.endsWith(basePath))

  if (path) {
    demo.value = markRaw(props.demos[path] as any)
    code.value = props.codes[path]
  }
}
</script>