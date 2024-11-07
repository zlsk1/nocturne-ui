<template>
  <div class="n-time-picker">
    <NTooltip
      ref="tooltipRef"
      transition="n-zoom-in-top"
      trigger="click"
      :gpu-acceleration="false"
      pure
      :disabled="disabled"
      @before-show="onBeforeShow"
    >
      <NInput
        v-model="formatValue"
        :prefix-icon="prefixIcon"
        clearable
        :placeholder="placeholder"
        :clear-icon="clearIcon"
        :disabled="disabled"
      ></NInput>
      <template #content>
        <PickPanel
          :current-time="currentValue"
          :tooltip-ref="tooltipRef"
          @change="onChange"
        ></PickPanel>
      </template>
    </NTooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, computed } from 'vue'
import { NInput, NTooltip } from '@/components'
import { timePickerProps } from './time-picker'
import PickPanel from './time-picker-panel.vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { TIMEPICKER_INJECTION_KEY } from './constants'
import type { Dayjs } from 'dayjs'
import type { TooltipInstance } from '@/components'

dayjs.extend(customParseFormat)

defineOptions({
  name: 'NTimePicker'
})

const props = defineProps(timePickerProps)

const currentValue = ref((props.modelValue && dayjs(props.modelValue)) || dayjs(new Date()))
const formatValue = ref(currentValue.value.format(props.format))
const tooltipRef = ref<TooltipInstance>()

const onBeforeShow = () => {
  if (formatValue.value) return
  currentValue.value = dayjs(new Date())
  formatValue.value = currentValue.value.format(props.format)
}

const onChange = (val: Dayjs) => {
  currentValue.value = val
  formatValue.value = val.format(props.format)
}

provide(TIMEPICKER_INJECTION_KEY, {
})
</script>
