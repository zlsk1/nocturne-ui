<template>
  <div class="nav-container">
    <a href="">Nocturne-ui</a>
    <div class="content">
      <ul class="nav-link">
        <li v-for="(item, index) in theme.nav" :key="item.text">
          <a :href="item.link" :class="actived(index) ? 'actived' : ''">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme, page, site } = useData()
const route = useRoute()

const actived = index => {
  const item = theme.value.nav[index]
  return item.link + '.html' === route.path
}
</script>

<style lang="scss" scoped>
</style>