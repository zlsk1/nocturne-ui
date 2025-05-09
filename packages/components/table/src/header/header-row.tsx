import { defineComponent } from 'vue'
import { definePropType } from '@nocturne-ui/utils'
import Cell from '../cell'
import { getCellFixedInfo } from '../utils/column'
import type { ExtractPropTypes } from 'vue'
import type { CellType, StickyOffsets, TableColumn } from '../type'

export const tableHeaderRowProps = {
  rowTag: {
    type: definePropType<any>(String),
    default: 'tr'
  },
  cellTag: {
    type: definePropType<any>(String),
    default: 'th'
  },
  cells: {
    type: definePropType<CellType[]>(Array)
  },
  stickyOffset: {
    type: definePropType<StickyOffsets>(Object),
    required: true
  },
  flattedColumns: {
    type: definePropType<TableColumn[]>(Array),
    required: true
  }
} as const
export type TableHeaderRowProps = ExtractPropTypes<typeof tableHeaderRowProps>

export default defineComponent({
  name: 'TableHeaderRow',
  props: tableHeaderRowProps,
  setup(props) {
    return () => {
      const {
        rowTag: RowTag,
        cellTag: CellTag,
        cells,
        stickyOffset,
        flattedColumns
      } = props

      return (
        <RowTag>
          {cells?.map((cell, idx) => {
            const { column, colStart, colEnd } = cell
            const fixedInfo = getCellFixedInfo(
              colStart!,
              colEnd!,
              flattedColumns,
              stickyOffset
            )

            return (
              <Cell
                {...cell}
                tag={CellTag}
                cellType="header"
                align={column?.align}
                column={column!}
                index={idx}
                {...fixedInfo}
                v-slots={{
                  default: () => column?.title
                }}
              />
            )
          })}
        </RowTag>
      )
    }
  }
})
