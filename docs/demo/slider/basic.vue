<template>
  <div class="mb-4">
    <n-slider v-model="val" size="small" style="max-width: 400px" />
  </div>
  <div class="mb-4">
    <n-slider v-model="val" size="default" style="max-width: 400px" />
  </div>
  <div>
    <n-slider v-model="val" size="large" style="max-width: 400px" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(40)
</script>
