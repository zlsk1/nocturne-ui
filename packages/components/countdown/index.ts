import { withInstall } from '@/utils'
import Countdown from './src/countdown.vue'

export * from './src/countdown'
export const NCountdown = withInstall(Countdown)
export default NCountdown
