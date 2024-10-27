<template>
  <div>
    <n-button type="primary" :icon="GoBack">返回</n-button>
    <n-button type="primary">
      搜索
      <Search size="16" ml="2"></Search>
    </n-button>
  </div>
</template>

<script lang="ts" setup>
import {
  RiArrowGoBackLine as GoBack,
  RiSearchLine as Search
} from '@remixicon/vue'
</script>