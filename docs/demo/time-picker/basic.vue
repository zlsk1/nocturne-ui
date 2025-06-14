<template>
  <div style="max-width: 240px">
    <n-time-picker v-model="val" @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { dayjs } from 'nocturne-ui'
import type { Dayjs } from 'dayjs'

const val = ref(dayjs())

const onChange = (val: Dayjs | string) => {
  console.log(val)
}
</script>
