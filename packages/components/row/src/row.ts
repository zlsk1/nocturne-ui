import row from './row.vue'
import type { ExtractPropTypes } from 'vue'

export const rowProps = {
  tag: {
    type: String,
    default: 'div'
  },
  align: {
    type: String,
    values: ['top', 'middle', 'bottom'],
    default: 'middle'
  },
  justify: {
    type: String,
    values: ['center', 'space-between', 'space-around', 'start', 'end', 'space-evenly'],
    default: 'center'
  },
  gutter: {
    type: Number,
    default: 0
  }
}

export type RowProps = ExtractPropTypes<typeof rowProps>
export type RowInstance = InstanceType<typeof row>
