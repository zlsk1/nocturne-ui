import type { FixedInfo, Key, TableColumn } from './type'
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { TableProps } from './props'

export type TableContext = {
  fixedList: FixedInfo[]
  pingLeft: boolean
  pingRight: boolean
  onColumnResize: (colKey: Key, colWidth: number) => void
}

export const tableContextKey: InjectionKey<TableContext> =
  Symbol('tableContext')

export type TableBodyContext = {
  columns: TableProps['columns']
  flattedColumns: TableColumn[]
}

export const tableBodyContextKey: InjectionKey<TableBodyContext> =
  Symbol('tableBodyContext')

export type SlotContext = {
  headerCell?: (...args: any[]) => any
  bodyCell?: (...args: any[]) => any
  default?: (...args: any[]) => any
}

export const slotContextKey: InjectionKey<ComputedRef<SlotContext>> =
  Symbol('slotContext')

export type HoverContext = {
  startRow: Ref<number>
  endRow: Ref<number>
  onHover: (start: number, end: number) => void
}

export const hoverContextKey: InjectionKey<HoverContext> =
  Symbol('hoverContext')
