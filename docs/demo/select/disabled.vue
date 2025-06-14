<template>
  <div style="max-width: 240px">
    <n-select v-model="val">
      <n-option
        v-for="item in 4"
        :key="item"
        :value="item"
        :label="`Option${item}`"
        :disabled="item === 2"
      />
    </n-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref(1)
</script>
