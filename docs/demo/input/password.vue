<template>
  <n-input v-model="val" type="password" show-password style="width: 260px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('123476')
</script>
