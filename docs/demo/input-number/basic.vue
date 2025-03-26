<template>
  <div>
    <n-input-number v-model="val" max="10" min="0" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(1)
</script>
