import { ensureArray, isNil, isUndefined } from '@nocturne-ui/utils'
import type {
  FixedInfo,
  FixedType,
  Key,
  StickyOffsets,
  TableColumn,
  TableColumns,
  TableGroupColumn
} from '../type'

export const getColumnsKey = (columns: TableColumn[]) => {
  const columnsKey: Array<Key> = []
  const keys: Record<Key, boolean> = {}

  for (const column of columns) {
    let key = column.key || ensureArray(column.dataKey).join('/')

    if (!isNil(key)) {
      while (keys[key]) {
        key = `${key}__next`
        continue
      }
      columnsKey.push(key)
    }
  }

  return columnsKey
}

export const flatColumns = (columns: TableColumns): TableColumn[] => {
  return columns.reduce((acc, column) => {
    const subColumns = (column as TableGroupColumn).children
    if (subColumns && subColumns.length > 0) {
      return [...acc, ...flatColumns(subColumns)]
    }

    return [...acc, { ...column }]
  }, [] as TableColumn[])
}

export const getCellFixedInfo = (
  colStart: number,
  colEnd: number,
  columns: readonly { fixed?: FixedType }[],
  stickyOffsets: StickyOffsets
): FixedInfo => {
  const startColumn = columns[colStart] || {}
  const endColumn = columns[colEnd] || {}

  let fixLeft: number | undefined = undefined
  let fixRight: number | undefined = undefined

  if (startColumn.fixed === 'left') {
    fixLeft = stickyOffsets.left[colStart]
  } else if (endColumn.fixed === 'right') {
    fixRight = stickyOffsets.right[colEnd]
  }

  let lastFixLeft = false
  let firstFixRight = false

  const nextColumn = columns[colEnd + 1]
  const prevColumn = columns[colStart - 1]

  if (fixLeft !== undefined) {
    const nextFixLeft = nextColumn && nextColumn.fixed === 'left'
    lastFixLeft = !nextFixLeft
  } else if (fixRight !== undefined) {
    const prevFixRight = prevColumn && prevColumn.fixed === 'right'
    firstFixRight = !prevFixRight
  }

  return {
    fixLeft,
    fixRight,
    lastFixLeft,
    firstFixRight,
    isSticky: isUndefined(stickyOffsets.isSticky) ? false : true
  }
}
