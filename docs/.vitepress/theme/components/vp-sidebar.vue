<template>
  <aside class="sidebar">
    <div>
      <section v-for="item in sidebar" :key="item.text" class="sidebar-content">
        <p class="type-name">{{ item.text }}</p>
        <vpSidebarLink v-for="children in item.items" :key="children" :item="children"></vpSidebarLink>
      </section>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useSidebar } from '../composables'
import vpSidebarLink from './vp-sidebar-item.vue'

const sidebar = useSidebar()
</script>

<style lang="scss" scoped>
</style>