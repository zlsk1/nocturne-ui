<template>
  <n-button @click="visible = !visible">show</n-button>
  <n-tooltip
    v-model:visible="visible"
    content="Bottom center"
    trigger="click"
    virtual-triggering
    :virtual-ref="triggerRef"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
const triggerRef = ref({
  getBoundingClientRect() {
    return position.value
  }
})

const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
})

const mousemoveHandler = (e: MouseEvent) => {
  position.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x: e.clientX,
    y: e.clientY
  })
}
onMounted(() => {
  document.addEventListener('mousemove', mousemoveHandler)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', mousemoveHandler)
})
</script>
