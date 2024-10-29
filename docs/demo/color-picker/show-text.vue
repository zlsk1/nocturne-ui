<template>
  <div>
    <n-color-picker v-model="val" showText></n-color-picker>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ('#7ecccc')
</script>