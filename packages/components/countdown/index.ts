import { withInstall } from '@/utils'
import Countdown from './src/countdown.vue'

export * from './src/countdown'
export const FrCountdown = withInstall(Countdown)
export default FrCountdown
