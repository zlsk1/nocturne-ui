<template>
  <vpNotFound v-if="isNotFound" />
  <!-- <Content v-else-if="isPage"></Content> -->
  <vpHome v-else-if="isPage" />
  <main v-else class="main-content">
    <vpDocContent />
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import vpDocContent from './vp-doc-content.vue'
import vpNotFound from './common/vp-not-found.vue'
import vpHome from './vp-home.vue'

const { page } = useData()

const isNotFound = computed(() => {
  return page.value.title === '404'
})

const isPage = computed(() => {
  return page.value.filePath === 'index.md'
})
</script>
