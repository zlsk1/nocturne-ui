import size from './size.vue'
import type { ExtractPropTypes } from 'vue'

export const sizeProps = {
  pageSizes: {
    type: Object,
    default: [10, 20, 30, 40, 50, 100]
  },
  pageSize: {
    type: Number,
    default: 10,
    validator: (val: number, props: any) => {
      return props.pageSizes.includes(val)
    }
  },
  small: {
    type: Boolean,
    default: false
  }
} as const

export type SizeInstance = InstanceType<typeof size>
export type SizeProps = ExtractPropTypes<typeof sizeProps>
