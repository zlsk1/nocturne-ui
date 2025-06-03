<template>
  <n-space>
    <n-button type="primary" :icon="GoBack">返回</n-button>
    <n-button type="primary">
      搜索
      <Search size="16" ml="2" />
    </n-button>
  </n-space>
</template>

<script lang="ts" setup>
import {
  RiArrowGoBackLine as GoBack,
  RiSearchLine as Search
} from '@remixicon/vue'
</script>
