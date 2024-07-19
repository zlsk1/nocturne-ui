<template>
  <div class="nav-container">
    <div class="nav-wrapper">
      <a href="">Nocturne-ui</a>
      <div class="content">
        <ul class="nav-link">
          <li v-for="(item, index) in theme.value.nav" :key="item.text">
            <a :href="item.link" :class="actived(index) ? 'actived' : ''">{{ item.text }}</a>
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

const actived = (index: number) => {
  const item = theme.value.nav[index]
  return item.link + '.html' === route.path
}
</script>

<style lang="scss" scoped>
</style>