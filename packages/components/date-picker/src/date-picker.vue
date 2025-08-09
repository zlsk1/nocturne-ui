<template>
  <div class="n-date-picker">
    <NTooltip pure persistent :gpu-acceleration="false" trigger="click">
      <NInput v-model="currentDate" clearable :prefix-icon="CalendarFilled" />
      <template #content>
        <DatePickerPanel />
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CalendarFilled } from '@ant-design/icons-vue'
import { NInput, NTooltip } from '@nocturne-ui/components'
import DatePickerPanel from './date-picker-panel.vue'
import { datePickerProps } from './date-picker'

defineOptions({
  name: 'NDatePicker'
})

defineProps(datePickerProps)

const currentDate = ref()
</script>
