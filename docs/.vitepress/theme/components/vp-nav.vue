<template>
  <div class="nav-container">
    <div class="nav-wrapper">
      <a href="">Nocturne-ui</a>
      <div class="content">
        <ul class="nav-link">
          <li v-for="(item, index) in theme.nav" :key="item.text">
            <a :href="item.link" :class="{ 'actived': actived(theme.nav[index].link) }">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useData, useRoute } from 'vitepress'

const { theme } = useData()
const route = useRoute()

const actived = (link: string) => {
  const slpitlink = link.split('/')
  const joinlink = [slpitlink[1], slpitlink[2]].join('/')
  
  return route.path.includes(joinlink)
}
</script>

<style lang="scss" scoped>
</style>