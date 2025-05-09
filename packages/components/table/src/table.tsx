import {
  computed,
  defineComponent,
  onMounted,
  provide,
  reactive,
  ref,
  toRef
} from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { definePropType, isNil, isNumber } from '@nocturne-ui/utils'
import { tableProps } from './props'
import TableHeader from './header/header'
import TableBody from './body/body'
import { slotContextKey, tableBodyContextKey, tableContextKey } from './context'
import ColGroup from './col-group'
import { flatColumns, getCellFixedInfo, getColumnsKey } from './utils/column'
import { getTargetScrollBarSize } from './utils/scrollbar-size'
import type { SlotsType } from 'vue'
import type { Key, TableColumn } from './type'
import type { SlotContext, TableContext } from './context'

const InternalTable = defineComponent({
  name: 'InternalTable',
  props: {
    ...tableProps,
    slotContext: {
      type: definePropType<SlotContext>(Object),
      default: () => ({})
    }
  },
  setup(props) {
    const ns = useNamespace('table')

    const scrollBodyRef = ref<HTMLElement | null>(null)
    const fixedHeaderRef = ref<HTMLElement | null>(null)
    const scrollBarSize = ref(0)
    const colsWidth = ref(new Map<Key, number>())
    const pingLeft = ref(false)
    const pingRight = ref(false)

    const flattedColumns = computed(() => {
      if (!props.columns) return []

      return flatColumns(props.columns)
    })

    const flattedColumnsWithScrollbar = computed(() => {
      if (fixedHeader.value) {
        const lastColumn = flattedColumns.value[flattedColumns.value.length - 1]
        const ScrollBarColumn: TableColumn = {
          fixed: lastColumn.fixed,
          width: scrollBarSize.value
        }

        return [...flattedColumns.value, ScrollBarColumn]
      }

      return flattedColumns.value
    })

    const shouldShowEllipsis = computed(() =>
      props.columns?.some((column) => column.ellipsis)
    )

    const fixedHeader = computed(() => props.scroll && !isNil(props.scroll.y))
    // const hasFixed = computed(
    //   () =>
    //     horizontalScroll.value && props.columns?.some((column) => column.fixed)
    // )

    const colKeys = computed(() => getColumnsKey(flattedColumns.value))

    const colWidths = computed(() =>
      colKeys.value.map((columnKey) => colsWidth.value.get(columnKey)!)
    )

    const horizontalScroll = computed(
      () => !isNil(props.scroll && props.scroll.x)
    )
    const measureColumnWidth = computed(
      () => fixedHeader.value || horizontalScroll.value
    )

    const stickyOffset = computed(() => {
      const leftOffsets: number[] = []
      const rightOffsets: number[] = []
      let left = 0
      let right = 0
      const colLen = colWidths.value.length

      for (let start = 0; start < colLen; start += 1) {
        // Left offset
        leftOffsets[start] = left
        left += colWidths.value[start] || 0

        // Right offset
        const end = colLen - start - 1
        rightOffsets[end] = right
        right += colWidths.value[end] || 0
      }

      return {
        left: leftOffsets,
        right: rightOffsets
      }
    })

    const fixedList = computed(() =>
      flattedColumns.value.map((_, colIndex) =>
        getCellFixedInfo(
          colIndex,
          colIndex,
          flattedColumns.value,
          stickyOffset.value
        )
      )
    )

    const headerStickyOffset = computed(() => {
      const { right, left } = stickyOffset.value
      return {
        ...stickyOffset.value,
        left,
        right: [...right.map((width) => width + scrollBarSize.value), 0],
        isSticky: false
      }
    })

    const onColumnResize: TableContext['onColumnResize'] = (
      colKey,
      colWidth
    ) => {
      if (!colsWidth.value.has(colKey)) {
        colsWidth.value.set(colKey, colWidth)
      }
      if (colsWidth.value.get(colKey) !== colWidth) {
        colsWidth.value.set(colKey, colWidth)
      }
    }

    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement
      const scrollLeft = target.scrollLeft

      if (fixedHeaderRef.value) {
        fixedHeaderRef.value.scrollLeft = scrollLeft
      }

      setPing()
    }

    const setPing = () => {
      if (scrollBodyRef.value) {
        const scrollLeft = scrollBodyRef.value.scrollLeft
        const scrollWidth = scrollBodyRef.value.scrollWidth
        const clientWidth = scrollBodyRef.value.clientWidth
        pingLeft.value = scrollLeft > 0
        pingRight.value = scrollLeft < scrollWidth - clientWidth
      }
    }

    onMounted(() => {
      if (scrollBodyRef.value) {
        scrollBarSize.value = getTargetScrollBarSize(scrollBodyRef.value).width
        setPing()
      }
    })

    provide(
      tableContextKey,
      reactive({
        fixedList,
        pingLeft,
        pingRight,
        onColumnResize
      })
    )

    provide(
      slotContextKey,
      computed(() => props.slotContext)
    )

    provide(
      tableBodyContextKey,
      reactive({
        columns: toRef(props, 'columns'),
        flattedColumns
      })
    )

    return () => {
      const { bordered, data, columns, scroll } = props

      const bodyTable = (
        <TableBody
          data={data}
          measureColumnWidth={measureColumnWidth.value}
          flattedColumns={flattedColumns.value}
        ></TableBody>
      )

      let tableBodyContent = null
      let tableContent = null

      if (fixedHeader.value) {
        tableBodyContent = (
          <div
            ref={scrollBodyRef}
            class={ns.b('body')}
            style={{
              maxHeight: isNumber(scroll?.y) ? `${scroll?.y}px` : scroll?.y,
              overflow: 'auto scroll'
            }}
            onScroll={onScroll}
          >
            <table
              style={{
                width: isNumber(scroll?.x) ? `${scroll?.x}px` : scroll?.x,
                minWidth: '100%',
                tableLayout: 'fixed'
              }}
            >
              <ColGroup
                columns={flattedColumns.value}
                colWidths={flattedColumns.value.map(({ width }) => width!)}
              ></ColGroup>
              {bodyTable}
            </table>
          </div>
        )
        tableContent = (
          <>
            <div
              style={{
                overflow: 'hidden'
              }}
              class={ns.b('header')}
              ref={fixedHeaderRef}
            >
              <table
                style={{
                  tableLayout: 'fixed'
                }}
              >
                <ColGroup
                  columns={flattedColumnsWithScrollbar.value}
                  colWidths={
                    scrollBarSize.value
                      ? [...colWidths.value, scrollBarSize.value]
                      : colWidths.value
                  }
                ></ColGroup>
                <TableHeader
                  columns={flattedColumnsWithScrollbar.value}
                  flattedColumns={flattedColumnsWithScrollbar.value}
                  stickyOffset={headerStickyOffset.value}
                ></TableHeader>
              </table>
            </div>
            {tableBodyContent}
          </>
        )
      } else {
        tableContent = (
          <table
            style={{
              tableLayout: shouldShowEllipsis.value
                ? 'fixed'
                : props.tableLayout
            }}
          >
            <ColGroup columns={flattedColumns.value}></ColGroup>
            <TableHeader
              columns={columns}
              stickyOffset={stickyOffset.value}
              flattedColumns={flattedColumns.value}
            ></TableHeader>
            {bodyTable}
          </table>
        )
      }

      return (
        <div class={ns.b('wrapper')}>
          <div class={ns.b('container')}>
            <div class={[ns.b(), ns.is('bordered', bordered)]}>
              {tableContent}
            </div>
          </div>
        </div>
      )
    }
  }
})

const Table = defineComponent({
  name: 'NTable',
  props: tableProps,
  slots: Object as SlotsType<{
    bodyCell?: (props: {
      text: any
      value: any
      record: Record<string, any>
      index: number
      column: TableColumn
    }) => void
    headerCell?: (props: { title: any; column: TableColumn }) => void
    default: any
  }>,
  setup(props, { slots }) {
    return () => {
      return (
        <InternalTable
          {...props}
          slotContext={slots}
          v-slots={{ ...slots }}
        ></InternalTable>
      )
    }
  }
})

export default Table
