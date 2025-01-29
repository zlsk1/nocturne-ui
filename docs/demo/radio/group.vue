<template>
  <n-radio-group v-model="value">
    <n-radio
      v-for="item in 3"
      :key="item"
      :label="`radio-${item}`"
      :value="item"
    />
  </n-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
