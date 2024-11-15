import Countdown from './src/countdown.vue'
import { withInstall } from '@/utils'

export * from './src/countdown'
export const NCountdown = withInstall(Countdown)
export default NCountdown
