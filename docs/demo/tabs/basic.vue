<template>
  <n-tabs v-model="activeTab">
    <n-tab-pane
      v-for="item in 4"
      :key="item"
      :label="`Tab-${item}`"
      :value="item"
    >
      {{ `Tab-${item}` }}
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref(1)
</script>
