import { withInstall } from '@nocturne-ui/utils'
import select from './src/select.vue'
import option from './src/option.vue'
import optionGroup from './src/option-group'

export * from './src/select'
export * from './src/option'
export * from './src/option-group'
export * from './src/types'
export * from './src/constants'
export const NSelect = withInstall(select)
export const NOption = withInstall(option)
export const NOptionGroup = withInstall(optionGroup)
