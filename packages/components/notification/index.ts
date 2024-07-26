import { withInstallFunction } from '@/utils'
import notification from './src/method'

export * from './src/notification'
export const NNotification = withInstallFunction(notification, '$notification')
export default NNotification
