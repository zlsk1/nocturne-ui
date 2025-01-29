<template>
  <n-input-number v-model="val" :step="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(10)
</script>
