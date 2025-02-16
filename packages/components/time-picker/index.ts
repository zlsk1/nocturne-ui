import { withInstall } from '@nocturne-ui/utils'
import TimePicker from './src/time-picker'

export * from './src/props/picker'
export * from './src/props/time-picker-panel'
export const NTimePicker = withInstall(TimePicker)
export default NTimePicker
