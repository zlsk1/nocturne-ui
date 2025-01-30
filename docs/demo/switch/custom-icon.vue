<template>
  <n-switch v-model="val">
    <template #active-icon>
      <RiCheckLine size="18" />
    </template>
    <template #inactive-icon>
      <RiCloseLine size="18" />
    </template>
  </n-switch>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiCheckLine, RiCloseLine } from '@remixicon/vue'

const val = ref(true)
</script>
