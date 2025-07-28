<script lang="ts" setup>
import { useData } from 'vitepress'
import { RiArrowUpFill } from '@remixicon/vue'
import vpAPIAside from './vp-api-aside.vue'
import vpPageSwitch from './vp-page-switch.vue'
import vpLastUpdate from './vp-last-update.vue'

import type { PageData } from 'vitepress'

const { page } = useData()
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content class="doc-content" />
      <vpLastUpdate />
      <vpPageSwitch />
    </div>
    <vpAPIAside v-if="(page as unknown as PageData).headers" />
    <n-back-top :icon="RiArrowUpFill" title="返回顶部" />
  </div>
</template>
