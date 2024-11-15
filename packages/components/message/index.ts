import message from './src/method'
import { withInstallFunction } from '@/utils'

export * from './src/message'
export const NMessage = withInstallFunction(message, '$message')
export default NMessage
