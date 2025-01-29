<template>
  <n-input-number v-model="val" :precision="2" :step="0.01" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(1)
</script>
