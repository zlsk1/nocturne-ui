<template>
  <div class="mb-4">
    <n-input-number v-model="val1" size="small" class="mr-4" />
    <n-input-number v-model="val2" size="default" class="mr-4" />
    <n-input-number v-model="val3" size="large" />
  </div>
  <div class="mb-4">
    <n-input-number v-model="val1" disabled />
  </div>
  <div class="mb-4">
    <n-input-number v-model="val4" :controls="false" />
  </div>
  <div class="mb-4">
    <n-input-number v-model="val5" readonly />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val1 = ref(10)
const val2 = ref(20)
const val3 = ref(30)
const val4 = ref(40)
const val5 = ref(50)
</script>
