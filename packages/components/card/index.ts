import { withInstall } from '@/utils'
import card from './src/card.vue'

export * from './src/card'
export const NCard = withInstall(card)
export default NCard
