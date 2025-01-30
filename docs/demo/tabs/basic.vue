<template>
  <n-tabs v-model="activeTab">
    <n-tab-item v-for="item in 4" :key="item" :label="`Tab-${item}`">
      {{ `Tab-${item}` }}
    </n-tab-item>
  </n-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref('1')
</script>
