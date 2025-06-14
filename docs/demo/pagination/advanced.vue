<template>
  <div class="mb-4">
    <n-checkbox-group v-model="state">
      <n-checkbox-button value="background">background</n-checkbox-button>
      <n-checkbox-button value="small">small</n-checkbox-button>
    </n-checkbox-group>
  </div>
  <n-pagination
    :total="1000"
    :background="state.includes('background')"
    :small="state.includes('small')"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const state = ref<string[]>(['background'])
</script>
