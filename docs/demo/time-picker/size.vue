<template>
  <n-radio-group v-model="size" class="mb-4">
    <n-radio-button value="large" label="large" />
    <n-radio-button value="default" label="default" />
    <n-radio-button value="small" label="small" />
  </n-radio-group>
  <div style="max-width: 240px">
    <n-time-picker v-model="val" :size="size" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { dayjs } from 'nocturne-ui'
import type { ComponentSize } from 'nocturne-ui'

const val = ref(dayjs())
const size = ref<ComponentSize>('default')
</script>
