<template>
  <div class="n-date-picker">
    <NTooltip pure persistent :gpu-acceleration="false" trigger="click">
      <NInput v-model="currentDate" clearable :prefix-icon="Calendar" />
      <template #content>
        <DatePickerPanel />
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiCalendarFill as Calendar } from '@remixicon/vue'
import { NInput, NTooltip } from '@/components'
import DatePickerPanel from './date-picker-panel.vue'
import { datePickerProps } from './date-picker'

defineOptions({
  name: 'NDatePicker'
})

defineProps(datePickerProps)

const currentDate = ref()
</script>
