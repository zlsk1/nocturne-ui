<template>
  <aside class="api-content-aside">
    <nav ref="container" class="api-content-container">
      <p class="api-content-title">内容</p>
      <div class="api-content-aside-content">
        <div ref="marker" class="outline-marker"></div>
        <VpApiAsideItem :headers="headers" />
      </div>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef, watch, ref } from "vue";
import VpApiAsideItem from "./vp-api-aside-item.vue";
import { getHeaders, type MenuItem } from '../composables/toc-anchor'
import { useRoute } from 'vitepress'

const route = useRoute()

const headers = shallowRef<MenuItem[]>([])
const container = ref()
const marker = ref()

onMounted(() => {
  watch(
    () => route.path,
    () => {
      headers.value = getHeaders()
    },
    {
      immediate: true,
    }
  )
})
</script>