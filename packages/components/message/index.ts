import { withInstallFunction } from '@/utils'
import message from './src/method'

export * from './src/message'
export const FrMessage = withInstallFunction(message, '$message')
export default FrMessage
