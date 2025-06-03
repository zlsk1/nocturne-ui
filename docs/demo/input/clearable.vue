<template>
  <n-input v-model="val" clearable style="max-width: 260px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('halo')
</script>
