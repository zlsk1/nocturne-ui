<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import vpNav from './vp-nav.vue'
import vpSidebar from './vp-sidebar.vue'
import vpContent from './vp-content.vue'

const { page } = useData()

const isPage = computed(() => {
  return page.value.filePath === 'index.md'
})
</script>

<template>
  <vpNav :plain="!!isPage"></vpNav>
  <vpSidebar v-if="!isPage"></vpSidebar>
  <vpContent></vpContent>
</template>
