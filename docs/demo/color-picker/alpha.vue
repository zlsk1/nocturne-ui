<template>
  <div class="mb-4">
    <n-color-picker v-model="value1" show-alpha />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('rgba(25, 67, 111, 0.74)')
</script>
