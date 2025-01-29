<template>
  <div class="mb-4">
    <n-input v-model="val" style="width: 260px" placeholder="Please input" />
  </div>
  <n-input
    v-model="val"
    style="width: 260px"
    placeholder="Please input"
    disabled
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('')
</script>
