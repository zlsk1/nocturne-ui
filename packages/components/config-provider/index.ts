import { withInstall } from '@/utils'
import configProvider from './src/config-provider'

export * from './src/props'
export * from './src/constants'
export * from './composables/use-global-config'

export const NConfigProvider = withInstall(configProvider)
export default NConfigProvider