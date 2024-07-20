<script lang="ts" setup>
import { onMounted } from 'vue';
import vpAPIContent from './vp-api-content.vue' 

onMounted(() => {
  resolveZeroWidthSpace()
})

const resolveZeroWidthSpace = () => {
  const anchor = document.querySelectorAll('.header-anchor')
  Array.from(anchor).forEach(v => v.textContent = '#')
}
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content class="doc-content" />
    </div>
    <vpAPIContent></vpAPIContent>
  </div>
</template>
