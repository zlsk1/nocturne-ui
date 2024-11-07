import { definePropType, iconPropType } from '@/utils'
import TimePicker from './time-picker.vue'
import { RiTimeFill as Time, RiCloseCircleLine as CloseCircle } from '@remixicon/vue'
import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const timePickerProps = {
  modelValue: {
    type: definePropType<number | string | Dayjs | Date>([Number, String, Object]),
    default: ''
  },
  placeholder: String,
  tabindex: {
    type: definePropType<string | number>([String, Number])
  },
  id: {
    type: definePropType<string | Record<string, string>>([String, Object])
  },
  name: String,
  prefixIcon: {
    type: iconPropType,
    default: Time
  },
  clearIcon: {
    type: iconPropType,
    default: CloseCircle
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
export type NTimePicker = InstanceType<typeof TimePicker>
