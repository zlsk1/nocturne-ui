import { definePropType, mutable } from '@nocturne-ui/utils'
import col from './col.vue'
import type { ExtractPropTypes } from 'vue'

export type ColSizeObject = {
  span?: number
  offset?: number
  pull?: number
  push?: number
}
export type ColSize = number | ColSizeObject

export const colProps = {
  tag: {
    type: String,
    default: 'div'
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xs: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  },
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  },
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  },
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  },
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  }
} as const

export type ColProps = ExtractPropTypes<typeof colProps>
export type ColInstance = InstanceType<typeof col>
