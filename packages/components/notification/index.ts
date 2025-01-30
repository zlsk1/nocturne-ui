import { withInstallFunction } from '@/utils'
import notification from './src/method'

export * from './src/props'
export * from './src/types'
export const NNotification = withInstallFunction(notification, '$notify')
export default NNotification
