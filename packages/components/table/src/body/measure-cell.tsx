import { defineComponent, inject, onMounted, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { definePropType } from '@nocturne-ui/utils'
import { tableContextKey } from '../context'
import type { Key } from '../type'

export const measureCellProps = {
  columnKey: {
    type: definePropType<Key>([String, Number]),
    required: true
  }
} as const

const MeasureCell = defineComponent({
  name: 'MeasureCell',
  props: measureCellProps,
  setup(props) {
    const tableContext = inject(tableContextKey, undefined)!

    const tdRef = ref<HTMLTableCellElement | null>(null)

    useResizeObserver(tdRef, (entries) => {
      const entry = entries[0]
      const { width } = entry.contentRect
      tableContext.onColumnResize(props.columnKey, width)
    })

    onMounted(() => {
      if (tdRef.value) {
        tableContext.onColumnResize(props.columnKey, tdRef.value.offsetWidth)
      }
    })

    return () => {
      return (
        <td ref={tdRef} style={{ padding: 0, border: 0, height: 0 }}>
          <div style={{ height: 0, overflow: 'hidden' }}>&nbsp;</div>
        </td>
      )
    }
  }
})

export default MeasureCell
