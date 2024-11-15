import select from './src/select.vue'
import { withInstall } from '@/utils'

export * from './src/select'
export const NSelect = withInstall(select)
export default NSelect
