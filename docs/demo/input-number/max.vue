<template>
  <n-input-number v-model="val" :min="10" :max="15" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(10)
</script>
