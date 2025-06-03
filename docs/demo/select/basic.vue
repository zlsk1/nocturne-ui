<template>
  <n-select v-model="val" style="max-width: 260px" placeholder="Please select">
    <n-option
      v-for="item in 4"
      :key="item"
      :value="item"
      :label="`Option${item}`"
    />
  </n-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(1)
</script>
