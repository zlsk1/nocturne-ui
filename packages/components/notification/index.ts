import notification from './src/method'
import { withInstallFunction } from '@/utils'

export * from './src/notification'
export const NNotification = withInstallFunction(notification, '$notification')
export default NNotification
