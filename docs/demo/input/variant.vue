<template>
  <div class="mb-4 w-[260px]">
    <n-input v-model="val" variant="outlined" placeholder="Please input" />
  </div>
  <div class="mb-4 w-[260px]">
    <n-input v-model="val" variant="borderless" placeholder="Please input" />
  </div>
  <div class="w-[260px]">
    <n-input v-model="val" variant="filled" placeholder="Please input" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('')
</script>
