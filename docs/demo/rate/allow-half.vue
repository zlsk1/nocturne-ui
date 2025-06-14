<template>
  <n-rate v-model="allowHalf" allow-half />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const allowHalf = ref(3)
</script>
