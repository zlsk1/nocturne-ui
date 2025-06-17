import { withInstall } from '@nocturne-ui/utils'
import Card from './src/card.vue'
import CardMeta from './src/card-meta.vue'

export * from './src/card'
export * from './src/card-meta'
export const NCard = withInstall(Card)
export const NCardMeta = withInstall(CardMeta)
export default NCard
