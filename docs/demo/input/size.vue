<template>
  <div class="mb-4">
    <n-input
      v-model="val"
      style="width: 260px"
      placeholder="Please input"
      size="small"
    />
  </div>
  <div class="mb-4">
    <n-input
      v-model="val"
      style="width: 260px"
      placeholder="Please input"
      size="default"
    />
  </div>
  <div class="mb-4">
    <n-input
      v-model="val"
      style="width: 260px"
      placeholder="Please input"
      size="large"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('')
</script>
