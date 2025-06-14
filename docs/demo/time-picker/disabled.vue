<template>
  <div style="max-width: 240px">
    <n-time-picker
      v-model="val"
      :disabled-hours="getDisabledHour"
      :disabled-minutes="getDisabledMinutes"
      :disabled-seconds="getDisabledSeconds"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { dayjs } from 'nocturne-ui'

const val = ref(dayjs())

const getRangeDisabled = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

const getDisabledHour: () => number[] = () => {
  return getRangeDisabled(0, 11)
}
const getDisabledMinutes = (hour: number) => {
  if (hour === 12) {
    return getRangeDisabled(0, 29)
  }
  if (hour === 18) {
    return getRangeDisabled(31, 59)
  }
}
const getDisabledSeconds = (hour: number, minute: number) => {
  if (hour === 12 && minute === 30) {
    return getRangeDisabled(1, 59)
  }
}
</script>
