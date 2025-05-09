import { Arrayable } from '@vueuse/core'
import type { CSSProperties } from 'vue'

export type Key = string | number

export interface TableColumn {
  title?: string
  /**
   * @description 列数据在数据项中对应的 key
   */
  dataKey?: Arrayable<string>
  /**
   * @description Vue 需要的 key，如果已经有唯一的dataKey，可不传入
   */
  key?: Key
  width?: string | number
  /**
   * @description 对齐方式
   */
  align?: AlignType
  /**
   * @description 列宽
   */
  colSpan?: number
  /**
   * @description 行宽
   */
  rowSpan?: number
  /**
   * @description 超出部分是否显示省略号
   */
  ellipsis?: boolean
  /**
   * @description 在表格的固定位置
   */
  fixed?: FixedType
  /**
   * @description 自定义渲染函数, 用于渲染复杂内容
   */
  customRender?: <T>(options: {
    value: any
    column: TableColumn
    record: T
    index: number
  }) => RenderedCell | any
  /**
   * @description 定义单元格属性
   */
  customCell?: <T>(options: {
    record: T
    column: TableColumn
    index: number
  }) => {
    colSpan?: number
    rowSpan?: number
  }
}

export interface TableGroupColumn extends TableColumn {
  children: TableColumn[]
}

export type TableColumns = (TableColumn | TableGroupColumn)[]

export type AlignType = 'left' | 'center' | 'right'

export interface CellType {
  key?: Key
  class?: string
  style?: CSSProperties
  column?: TableColumns[number]
  colSpan?: number
  rowSpan?: number

  /** Only used for table header */
  hasSubColumns?: boolean
  colStart?: number
  colEnd?: number
}

export interface RenderedCell {
  props?: CellType
  children?: any
}

export type TableLayout = 'auto' | 'fixed'

export type FixedType = 'left' | 'right' | boolean

export interface TableScrollType {
  x?: number
  y?: number
}

export interface StickyOffsets {
  left: readonly number[]
  right: readonly number[]
  isSticky?: boolean
}

export interface FixedInfo {
  fixLeft: number | undefined
  fixRight: number | undefined
  lastFixLeft: boolean
  firstFixRight: boolean

  isSticky: boolean
}
