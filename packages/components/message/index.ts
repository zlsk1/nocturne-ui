import { withInstallFunction } from '@nocturne-ui/utils'
import message from './src/method'

export * from './src/message'
export const NMessage = withInstallFunction(message, '$message')
export default NMessage
