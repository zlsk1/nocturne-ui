<template>
  <main class="main-content">
    <vpNotFound v-if="isNotFound"></vpNotFound>
    <Content v-else-if="isPage"></Content>
    <vpDocContent v-else></vpDocContent>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import vpDocContent from './vp-doc-content.vue'
import vpNotFound from './common/vp-not-found.vue'

const { page } = useData()

const isNotFound = computed(() => {
  return page.value.title === '404'
})

const isPage = computed(() => {
  return page.value.filePath === 'index.md'
})
</script>