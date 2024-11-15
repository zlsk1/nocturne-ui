<template>
  <div>
    <n-color-picker v-model="val" show-text />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('#7ecccc')
</script>
