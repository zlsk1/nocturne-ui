<script lang="ts" setup>
import { onMounted, watch, nextTick } from 'vue';
import { useData, useRoute } from 'vitepress'
import vpAPIAside from './vp-api-aside.vue' 
import vpPageSwitch from './vp-page-switch.vue'
import vpLastUpdate from './vp-last-update.vue'

import type { PageData } from 'vitepress'

onMounted(() => {
  resolveZeroWidthSpace()
})

const { page } = useData()
const route = useRoute()

const resolveZeroWidthSpace = () => {
  const anchor = document.querySelectorAll('.header-anchor')
  Array.from(anchor).forEach(v => v.textContent = '#')
}

onMounted(() => {
  watch(
    () => route.path,
    async() => {
      await nextTick()
      resolveZeroWidthSpace()
    },
    {
      immediate: true,
    }
  )
})
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content class="doc-content" />
      <vpLastUpdate></vpLastUpdate>
      <vpPageSwitch></vpPageSwitch>
    </div>
    <vpAPIAside v-if="(page as unknown as PageData).headers"></vpAPIAside>
  </div>
</template>
