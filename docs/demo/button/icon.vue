<template>
  <div>
    <n-button type="primary" :icon="GoBack">go back</n-button>
    <n-button type="primary">
      search
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