import { computed, defineComponent } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { definePropType, isNil } from '@nocturne-ui/utils'
import { tableProps } from '../props'
import HeaderRow from './header-row'
import type { ExtractPropTypes } from 'vue'
import type {
  CellType,
  StickyOffsets,
  TableColumn,
  TableColumns,
  TableGroupColumn
} from '../type'

export const tableHeaderProps = {
  columns: tableProps['columns'],
  flattedColumns: {
    type: definePropType<TableColumn[]>(Array),
    required: true
  },
  stickyOffset: {
    type: definePropType<StickyOffsets>(Object),
    required: true
  }
} as const

export type TableHeaderProps = ExtractPropTypes<typeof tableHeaderProps>

function parseHeaderRows(rootColumns?: TableColumns): CellType[][] {
  if (!rootColumns) return []
  const rows: CellType[][] = []

  function fillRowCells(
    columns: TableColumns,
    colIndex: number,
    rowIndex = 0
  ): number[] {
    // Init rows
    rows[rowIndex] = rows[rowIndex] || []

    let currentColIndex = colIndex
    const colSpans: number[] = columns.filter(Boolean).map((column) => {
      const cell: CellType = {
        key: column.key,
        column,
        colStart: currentColIndex
      }

      let colSpan = 1

      const subColumns = (column as TableGroupColumn).children
      if (subColumns && subColumns.length > 0) {
        colSpan = fillRowCells(
          subColumns,
          currentColIndex,
          rowIndex + 1
        ).reduce((total, count) => total + count, 0)
        cell.hasSubColumns = true
      }

      if (!isNil(column.colSpan)) {
        ;({ colSpan } = column)
      }

      if ('rowSpan' in column) {
        cell.rowSpan = column.rowSpan
      }

      cell.colSpan = colSpan
      cell.colEnd = cell.colStart || 0 + colSpan - 1
      rows[rowIndex].push(cell)

      currentColIndex += colSpan

      return colSpan
    })

    return colSpans
  }

  // Generate `rows` cell data
  fillRowCells(rootColumns, 0)

  // Handle `rowSpan`
  const rowCount = rows.length
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    rows[rowIndex].forEach((cell) => {
      if (!('rowSpan' in cell) && !cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex
      }
    })
  }

  return rows
}

export default defineComponent({
  name: 'TableHeader',
  props: tableHeaderProps,
  setup(props) {
    const ns = useNamespace('table')

    const rows = computed(() => parseHeaderRows(props.columns))

    return () => {
      const { flattedColumns, stickyOffset } = props

      return (
        <thead class={ns.b('thead')}>
          {rows.value?.map((row, idx) => {
            return (
              <HeaderRow
                key={idx}
                cells={row}
                stickyOffset={stickyOffset}
                flattedColumns={flattedColumns}
              />
            )
          })}
        </thead>
      )
    }
  }
})
