<script lang="ts" setup>
import { onMounted } from 'vue';
import vpAPIContent from './vp-api-content.vue' 
import vpPageSwitch from './vp-page-switch.vue' 

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
      <vpPageSwitch></vpPageSwitch>
    </div>
    <vpAPIContent></vpAPIContent>
  </div>
</template>
