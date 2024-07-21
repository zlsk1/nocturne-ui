<template>
  <div class="nav-container">
    <div class="nav-wrapper">
      <a href="">Nocturne-ui</a>
      <div class="content">
        <nav class="nav-link">
          <a v-for="(item, index) in theme.nav" :key="item.text" :href="item.link" :class="{ 'actived': actived(theme.nav[index].link) }">{{ item.text }}</a>
        </nav>
        <n-switch></n-switch>
        <a href="https://github.com/zlsk1/nocturne-ui" class="link-github" title="github" target="_blank">
          <Github></Github>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData, useRoute } from 'vitepress'
import { RiGithubFill as Github } from '@remixicon/vue';

const { theme } = useData()
const route = useRoute()

const actived = (link: string) => {
  const slpitlink = link.split('/')
  const joinlink = [slpitlink[1], slpitlink[2]].join('/')
  
  return route.path.includes(joinlink)
}
</script>