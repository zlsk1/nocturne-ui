<template>
  <div class="mb-4">
    <n-input-number v-model="value" :max="10" :min="0" controls-mode="outter" />
  </div>
  <div>
    <n-input-number v-model="value" :max="10" :min="0" controls-mode="outter">
      <template #decreaseIcon>
        <RiArrowDownWideLine size="16" />
      </template>
      <template #increaseIcon>
        <RiArrowUpWideLine size="16" />
      </template>
    </n-input-number>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiArrowDownWideLine, RiArrowUpWideLine } from '@remixicon/vue'

const value = ref(1)
</script>
