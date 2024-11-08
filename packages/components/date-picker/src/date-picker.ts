import type { ExtractPropTypes } from 'vue'
import DatePicker from './date-picker.vue'

export const datePickerProps = {

} as const

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerInstance = InstanceType<typeof DatePicker>
