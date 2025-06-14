<template>
  <div style="max-width: 240px">
    <n-time-picker v-model="val" :minute-step="15" :second-step="10" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { dayjs } from 'nocturne-ui'

const val = ref(dayjs())
</script>
