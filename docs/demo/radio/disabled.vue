<template>
  <div class="mb-4">
    <n-radio :disabled="disabled" label="radio" />
    <n-radio :disabled="disabled">radio</n-radio>
  </div>
  <n-button type="primary" @click="disabled = !disabled"
    >Toggle disabled</n-button
  >
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(true)
</script>
