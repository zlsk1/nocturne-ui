<template>
  <div class="mb-4">
    <n-switch v-model="val" />
  </div>
  <div>
    <n-switch v-model="val" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(false)
</script>
