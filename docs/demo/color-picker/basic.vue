<template>
  <div class="mb-4">
    <n-color-picker v-model="value1"></n-color-picker>
  </div>
  <div>
    <n-color-picker v-model="value2" size="large" class="mr-4"></n-color-picker>
    <n-color-picker v-model="value3" size="default" class="mx-4"></n-color-picker>
    <n-color-picker v-model="value4" size="small" class="mx-4"></n-color-picker>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('#409eff')
const value2 = ref('#9499ff')
const value3 = ref('#8C40FF')
const value4 = ref('#B940FF')
</script>