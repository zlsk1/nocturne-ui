import { withInstall } from '@/utils'
import statistic from './src/statistic.vue'

export * from './src/statistic'
export const FrStatistic = withInstall(statistic)
export default FrStatistic
