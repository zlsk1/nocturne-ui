<template>
  <n-slider v-model="val" style="max-width: 400px" :step="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(40)
</script>
