import configProvider from './src/config-provider'
import { withInstall } from '@/utils'

export * from './src/props'
export * from './src/constants'
export * from './src/use-global-config'

export const NConfigProvider = withInstall(configProvider)
export default NConfigProvider
