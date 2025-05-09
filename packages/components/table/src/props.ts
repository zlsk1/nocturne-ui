import { definePropType } from '@nocturne-ui/utils'
import table from './table'
import type { ExtractPropTypes } from 'vue'
import type { TableColumns, TableLayout, TableScrollType } from './type'

export const tableProps = {
  data: {
    type: definePropType<any[]>(Array)
  },
  columns: {
    type: definePropType<TableColumns>(Array)
  },
  bordered: {
    type: Boolean,
    default: false
  },
  tableLayout: {
    type: definePropType<TableLayout>(String)
  },
  scroll: {
    type: definePropType<TableScrollType>(Object)
  }
} as const

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableInstance = InstanceType<typeof table>
