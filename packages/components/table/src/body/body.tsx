import { defineComponent, provide, ref } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { definePropType } from '@nocturne-ui/utils'
import { tableProps } from '../props'
import { hoverContextKey } from '../context'
import { TableColumn } from '../type'
import { getColumnsKey } from '../utils/column'
import TableBodyRow from './body-row'
import MeasureCell from './measure-cell'
import type { ExtractPropTypes } from 'vue'

export const tableBodyProps = {
  data: tableProps['data'],
  measureColumnWidth: Boolean,
  flattedColumns: {
    type: definePropType<TableColumn[]>(Array),
    required: true
  }
} as const

export type TableBodyProps = ExtractPropTypes<typeof tableBodyProps>

export default defineComponent({
  name: 'TableBody',
  props: tableBodyProps,
  setup(props) {
    const ns = useNamespace('table')

    const startRow = ref(-1)
    const endRow = ref(-1)
    const onHover = (start: number, end: number) => {
      startRow.value = start
      endRow.value = end
    }

    provide(hoverContextKey, {
      startRow,
      endRow,
      onHover
    })

    return () => {
      const { measureColumnWidth, data, flattedColumns } = props

      const columnsKey = getColumnsKey(flattedColumns)

      const rows = data?.map((record, index) => {
        return (
          <TableBodyRow
            record={record}
            index={index}
            key={record.key}
            rowTag="tr"
            cellTag="td"
          ></TableBodyRow>
        )
      })

      return (
        <tbody class={ns.b('tbody')}>
          {measureColumnWidth && (
            <tr
              aria-hidden="true"
              style={{ height: 0, fontSize: 0 }}
              class={ns.b('measure-row')}
            >
              {columnsKey.map((columnKey) => (
                <MeasureCell key={columnKey} columnKey={columnKey} />
              ))}
            </tr>
          )}

          {rows}
        </tbody>
      )
    }
  }
})
