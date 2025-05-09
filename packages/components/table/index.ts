import { withInstall } from '@nocturne-ui/utils'
import table from './src/table'

export * from './src/type'
export * from './src/props'
export * from './src/context'

export const NTable = withInstall(table)
export default NTable
