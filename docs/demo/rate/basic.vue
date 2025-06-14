<template>
  <n-rate v-model="rate" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rate = ref(2)
</script>
