<template>
  <div>
    <n-switch v-model="val" active-text="true" inactive-text="false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(false)
</script>
