<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.documentElement.classList.add('dark')
})
</script>

<template>
  <div ref="containerRef" class="playground-container">
    <n-input model-value="hello world" />
  </div>
</template>

<style lang="scss">
html,
body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
}
.playground-container {
  position: relative;
  display: flex;
}
</style>
