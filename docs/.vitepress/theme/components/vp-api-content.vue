<template>
  <aside class="api-content-aside">
    <nav class="api-content-container">
      <p class="api-content-title">内容</p>
      <a
        v-for="item in page.headers[0].children"
        :key="item.link"
        :href="item.link"
        :class="[
          'api-content-anchor',
        ]"
      >
        <span>{{ item.title }}</span>
        <a v-for="item1 in item.children" :key="item1.link" :href="item1.link" class="api-content-anchor level-3">
          <span>{{ item1.title }}</span>
        </a>
      </a>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { useData } from "vitepress"
// import { useTocAnchor } from '../composables/toc-anchor'

const { page } = useData()
</script>