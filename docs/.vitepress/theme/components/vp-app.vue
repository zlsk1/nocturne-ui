<script lang="ts" setup>
import vpDocContent from './vp-doc-content.vue'
import vpNav from './vp-nav.vue'
import vpSidebar from './vp-sidebar.vue' 
</script>

<template>
  <div class="app">
    <vpNav></vpNav>
    <vpSidebar></vpSidebar>
    <vpDocContent></vpDocContent>
  </div>
</template>