<template>
  <n-color-picker v-model="val" show-text />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const format = ref('hex')
const val = ref('#7ecccc')
</script>
