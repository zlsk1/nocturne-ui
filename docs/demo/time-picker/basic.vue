<template>
  <n-time-picker v-model="val" style="max-width: 260px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(Date.now())
</script>
