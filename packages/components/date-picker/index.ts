import { withInstall } from '@/utils'
import DatePicker from './src/date-picker.vue'

export * from './src/date-picker'
export const NDatePicker = withInstall(DatePicker)
export default NDatePicker
