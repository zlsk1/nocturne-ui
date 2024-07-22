<script lang="ts" setup>
import vpDocContent from './vp-doc-content.vue'
import vpNav from './vp-nav.vue'
import vpSidebar from './vp-sidebar.vue' 
import vpContent from './vp-content.vue'
</script>

<template>
  <div class="app">
    <vpNav></vpNav>
    <vpSidebar></vpSidebar>
    <vpContent></vpContent>
  </div>
</template>