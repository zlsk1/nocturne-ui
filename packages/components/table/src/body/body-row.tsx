import { defineComponent, inject } from 'vue'
import { definePropType } from '@nocturne-ui/utils'
import Cell from '../cell'
import { tableBodyContextKey, tableContextKey } from '../context'
import type { ExtractPropTypes } from 'vue'

export const tableBodyRowProps = {
  record: {
    type: Object
  },
  index: {
    type: Number,
    required: true
  },
  rowTag: {
    type: definePropType<any>(String),
    default: 'tr'
  },
  cellTag: {
    type: definePropType<any>(String),
    default: 'td'
  }
} as const
export type TableBodyRowProps = ExtractPropTypes<typeof tableBodyRowProps>

export default defineComponent({
  name: 'TableBodyRow',
  props: tableBodyRowProps,
  setup(props) {
    const tableContext = inject(tableContextKey, undefined)!
    const { flattedColumns } = inject(tableBodyContextKey, undefined)!

    return () => {
      const { record, index, rowTag: RowTag, cellTag } = props
      const { fixedList } = tableContext

      return (
        <RowTag>
          {flattedColumns?.map((column, colIdx) => {
            const fixedInfo = fixedList[colIdx]

            return (
              <Cell
                cellType="body"
                key={column.key}
                record={record}
                recordKey={column.dataKey}
                index={index}
                tag={cellTag}
                column={column}
                align={column.align}
                {...fixedInfo}
              ></Cell>
            )
          })}
        </RowTag>
      )
    }
  }
})
