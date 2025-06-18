import { withInstall } from '@nocturne-ui/utils'
import FloatButton from './src/float-button'
import FloatButtonGroup from './src/float-button-group'
import BackTop from './src/back-top'

export * from './src/props'
export const NFloatButton = withInstall(FloatButton)
export const NFloatButtonGroup = withInstall(FloatButtonGroup)
export const NBackTop = withInstall(BackTop)

export default NFloatButton
