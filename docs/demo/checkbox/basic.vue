<template>
  <div class="mb-2">
    <n-checkbox v-model="checkbox1" size="large">choosen 1</n-checkbox>
    <n-checkbox v-model="checkbox2" size="large">choosen 2</n-checkbox>
    <n-checkbox v-model="checkbox3" size="large">choosen 3</n-checkbox>
  </div>
  <div class="mb-2">
    <n-checkbox v-model="checkbox4" label="choosen 1"></n-checkbox>
    <n-checkbox v-model="checkbox5" label="choosen 2"></n-checkbox>
    <n-checkbox v-model="checkbox6" label="choosen 3"></n-checkbox>
  </div>
  <div>
    <n-checkbox v-model="checkbox7" size="small">choosen 1</n-checkbox>
    <n-checkbox v-model="checkbox8" size="small">choosen 2</n-checkbox>
    <n-checkbox v-model="checkbox9" size="small">choosen 3</n-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkbox1 = ref(true)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(true)
const checkbox5 = ref(false)
const checkbox6 = ref(false)
const checkbox7 = ref(true)
const checkbox8 = ref(false)
const checkbox9 = ref(false)
</script>