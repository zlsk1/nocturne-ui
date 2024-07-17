import { withInstall } from '@/utils'
import statistic from './src/statistic.vue'

export * from './src/statistic'
export const NStatistic = withInstall(statistic)
export default NStatistic
