<template>
  <n-radio-group v-model="value">
    <n-radio-button
      v-for="item in 3"
      :key="item"
      :label="`radio-${item}`"
      :value="item"
      :disabled="item === 2"
    />
  </n-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
