<template>
  <div class="n-date-picker">
    <NTooltip
      pure
      persistent
      :gpu-acceleration="false"
      trigger="click"
    >
      <NInput
        v-model="currentDate"
        clearable
        :prefix-icon="Calendar"
      ></NInput>
      <template #content>
        <DatePickerPanel></DatePickerPanel>
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NTooltip, NInput } from '@/components'
import DatePickerPanel from './date-picker-panel.vue'
import { RiCalendarFill as Calendar } from '@remixicon/vue'
import { datePickerProps } from './date-picker'

defineOptions({
  name: 'NDatePicker'
})

const props = defineProps(datePickerProps)

const currentDate = ref()
</script>
