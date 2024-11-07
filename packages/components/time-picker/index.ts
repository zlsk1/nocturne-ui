import { withInstall } from '@/utils'
import TimePicker from './src/time-picker.vue'

export * from './src/time-picker'
export const NTimePicker = withInstall(TimePicker)
export default NTimePicker
