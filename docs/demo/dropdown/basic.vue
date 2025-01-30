<template>
  <n-dropdown>
    <n-button>
      show dropdown <n-icon size="18"><RiArrowDownSLine /></n-icon>
    </n-button>
    <template #content>
      <n-dropdown-item>item 1</n-dropdown-item>
      <n-dropdown-item>item 2</n-dropdown-item>
      <n-dropdown-item>item 3</n-dropdown-item>
    </template>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { RiArrowDownSLine } from '@remixicon/vue'
</script>
