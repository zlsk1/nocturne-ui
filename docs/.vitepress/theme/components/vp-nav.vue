<template>
  <div class="nav-container">
    <div class="nav-wrapper">
      <a href="/index.html" class="flex items-center">
        <img src="../../../logo.svg" alt="">
        <span class="ml-2 text-lg" style="font-family: var(--code-font-family); color: #409eff">Nocturne</span>
      </a>
      <div class="content">
        <vpDocSearch></vpDocSearch>
        <nav class="nav-link">
          <a v-for="(item, index) in theme.nav" :key="item.text" :href="item.link" :class="{ 'actived': actived(theme.nav[index].link) }">{{ item.text }}</a>
        </nav>
        <vpThemeToggle></vpThemeToggle>
        <a href="https://github.com/zlsk1/nocturne-ui" class="link-github" title="github" target="_blank">
          <Github></Github>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData, useRoute } from 'vitepress'
import {
  RiGithubFill as Github,
} from '@remixicon/vue';
import vpThemeToggle from './common/vp-theme-toggle.vue'
import vpDocSearch from './vp-doc-search.vue'

const { theme } = useData()
const route = useRoute()

const actived = (link: string) => {
  const slpitlink = link.split('/')
  const joinlink = [slpitlink[1], slpitlink[2]].join('/')
  
  return route.path.includes(joinlink)
}
</script>