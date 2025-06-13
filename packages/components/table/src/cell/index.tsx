import {
  computed,
  defineComponent,
  inject,
  ref,
  renderSlot,
  watchEffect
} from 'vue'
import {
  definePropType,
  ensureValidVNode,
  flattedChildren,
  isNil,
  isNumber,
  isObject,
  isUndefined
} from '@nocturne-ui/utils'
import { Arrayable } from '@vueuse/core'
import { useNamespace } from '@nocturne-ui/composables'
import { hoverContextKey, slotContextKey, tableContextKey } from '../context'
import { getPathValue } from '../utils/value'
import type { AlignType, TableColumn } from '../type'
import type { CSSProperties, ExtractPropTypes } from 'vue'

export const tableCellProps = {
  tag: {
    type: definePropType<any>(String),
    default: 'td'
  },
  record: {
    type: definePropType<Record<string, any>>(Object)
  },
  column: {
    type: definePropType<TableColumn>(Object),
    required: true
  },
  align: {
    type: definePropType<AlignType>(String)
  },
  cellType: {
    type: definePropType<'header' | 'body'>(String)
  },
  /**
   * @description the index of the column in the column list
   */
  index: {
    type: Number,
    required: true
  },
  /**
   * @description the index of the record in the data source
   */
  recordIndex: {
    type: Number
  },
  recordKey: {
    type: definePropType<Arrayable<string>>([String, Array])
  },
  colSpan: Number,
  rowSpan: Number,
  customRender: {
    type: definePropType<TableColumn['customRender']>(Function)
  },
  fixRight: Number,
  fixLeft: Number,
  lastFixLeft: Boolean,
  firstFixRight: Boolean,
  isSticky: Boolean
} as const

export type TableCellProps = ExtractPropTypes<typeof tableCellProps>
export type TableCellInstance = InstanceType<typeof Cell>

const Cell = defineComponent({
  name: 'TableCell',
  props: tableCellProps,
  setup(props, { slots }) {
    const slotContext = inject(slotContextKey, undefined)!
    const hoverContext = inject(hoverContextKey, undefined)!
    const tableContext = inject(tableContextKey, undefined)!

    const ns = useNamespace('table')

    const cellRef = ref<HTMLElement | null>(null)

    const colSpan = computed(() => {
      const { colSpan, column, record, index } = props

      return (
        colSpan ?? column?.customCell?.({ record, column, index })?.colSpan ?? 1
      )
    })
    const rowSpan = computed(() => {
      const { rowSpan, column, record, index } = props
      return (
        rowSpan ?? column?.customCell?.({ record, column, index })?.rowSpan ?? 1
      )
    })

    const finalRowSpan = computed(() =>
      rowSpan.value !== 1 ? rowSpan.value : undefined
    )
    const finalColSpan = computed(() =>
      colSpan.value !== 1 ? colSpan.value : undefined
    )

    const hovering = computed(() => {
      if (!hoverContext) {
        return false
      }
      const { startRow, endRow } = hoverContext
      return (
        (props.index >= startRow.value && props.index <= endRow.value) ||
        props.index + rowSpan.value - 1 === startRow.value
      )
    })

    const cellCls = computed(() => [
      ns.b('cell'),
      props.column.ellipsis && ns.bm('cell', 'ellipsis'),
      !isUndefined(props.fixRight) && ns.b('cell-fixed-right'),
      !isUndefined(props.fixLeft) && ns.b('cell-fixed-left'),
      props.lastFixLeft && ns.b('cell-fixed-left-last'),
      props.firstFixRight && ns.b('cell-fixed-right-first'),
      tableContext.pingLeft && props.lastFixLeft && 'ping-left',
      tableContext.pingRight && props.firstFixRight && 'ping-right'
    ])

    const onMouseenter = () => {
      if (!hoverContext) {
        return
      }
      hoverContext.onHover(props.index, props.index + rowSpan.value - 1)
    }

    const onMouseleave = () => {
      if (!hoverContext) {
        return
      }
      hoverContext.onHover(-1, -1)
    }

    watchEffect(() => {
      if (cellRef.value) {
        if (hovering.value) {
          cellRef.value.classList.add(ns.bm('cell', 'hover'))
        } else {
          cellRef.value.classList.remove(ns.bm('cell', 'hover'))
        }
      }
    })

    return () => {
      const {
        tag: Tag,
        column,
        align,
        recordKey,
        record,
        cellType,
        index,
        fixLeft,
        fixRight,
        customRender
      } = props

      if (colSpan.value === 0 || rowSpan.value === 0) return null

      const alignStyle: CSSProperties = {}
      const fixedStyle: CSSProperties = {}
      if (align) {
        alignStyle.textAlign = align
      }
      if (column.fixed) {
        fixedStyle.position = 'sticky'
        if (column.fixed === 'left') {
          fixedStyle.left = isNumber(fixLeft) ? `${fixLeft}px` : fixLeft
        } else if (column.fixed === 'right') {
          fixedStyle.right = isNumber(fixRight) ? `${fixRight}px` : fixRight
        }
      }

      let childNode: any
      const children = slots.default?.()

      if (!isNil(children) || cellType === 'header') {
        childNode = children

        if (slotContext.value.headerCell && cellType === 'header') {
          const value = getPathValue(record, recordKey)
          const props = {
            title: value,
            column
          }
          const child = renderSlot(
            slotContext.value,
            'headerCell',
            props,
            () => {
              const slot = slotContext.value.headerCell?.(props)
              if (ensureValidVNode(slot)) return slot

              return children
            }
          )
          childNode = flattedChildren(child as any)
        }
      } else {
        const value = getPathValue(record, recordKey)

        childNode = value

        if (customRender) {
          const renderData = customRender({
            value,
            record,
            index,
            column
          })

          childNode = renderData
        }

        if (slotContext.value.bodyCell && cellType === 'body') {
          const props = {
            text: value,
            value,
            record,
            column,
            index
          }
          const child = renderSlot(slotContext.value, 'bodyCell', props, () => {
            const slot = slotContext.value.bodyCell?.(props)
            if (ensureValidVNode(slot)) return slot

            const fallback = childNode === undefined ? value : childNode
            return [!isObject(fallback) ? fallback : null]
          })

          childNode = flattedChildren(child as any)
        }
      }

      let childNodeTitle: any = childNode
      let currentChild = childNode[0].children ?? undefined

      while (currentChild) {
        childNodeTitle = currentChild
        currentChild = currentChild[0].children ?? undefined
      }

      return (
        <Tag
          class={cellCls.value}
          ref={cellRef}
          style={[alignStyle, fixedStyle]}
          colSpan={finalColSpan.value}
          rowSpan={finalRowSpan.value}
          onMouseenter={onMouseenter}
          onMouseleave={onMouseleave}
          title={column.ellipsis && childNodeTitle}
        >
          {childNode}
        </Tag>
      )
    }
  }
})

export default Cell
