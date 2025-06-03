<template>
  <aside class="box-border w-[var(--api-content-width)] pt-7 pl-7 pr-7">
    <nav
      class="sticky top-[100px] pl-[20px]"
      style="border-left: 1px solid var(--n-border-color-light)"
    >
      <n-anchor class="relative">
        <VpApiAsideItem :headers="headers" />
      </n-anchor>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef, watch } from 'vue'
import { useRoute } from 'vitepress'
import { getHeaders } from '../composables/toc-anchor'
import VpApiAsideItem from './vp-api-aside-item.vue'
import type { MenuItem } from '../composables/toc-anchor'

const route = useRoute()

const headers = shallowRef<MenuItem[]>([])

onMounted(() => {
  watch(
    () => route.path,
    () => {
      headers.value = getHeaders()[0].children!
    },
    {
      immediate: true
    }
  )
})
</script>

<style scoped lang="scss">
:deep(.n-anchor) {
  a {
    color: var(--n-text-color-secondary);
    div {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
